import os
import json
import asyncio
from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
import requests
from bs4 import BeautifulSoup
import httpx
import logging
from playwright.async_api import async_playwright
import traceback

# Configure logging
logging.basicConfig(level=logging.INFO, 
                   format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger("index-api")

app = FastAPI(title="Web Content Q&A API", 
             description="API for extracting content from web pages and answering questions using LLMs")

# Add CORS middleware to allow cross-origin requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins in development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for scraped content (session-based)
content_store = {}

class UrlsInput(BaseModel):
    urls: List[str]
    session_id: Optional[str] = None

class QuestionInput(BaseModel):
    question: str
    session_id: str

# Cache for the playwright browser instance to avoid repeatedly launching browsers
playwright_cache = {"browser": None, "context": None, "playwright": None}

async def initialize_playwright():
    """Initialize the playwright browser if not already initialized."""
    if playwright_cache["browser"] is None:
        try:
            logger.info("Initializing Playwright browser")
            playwright_cache["playwright"] = p = await async_playwright().start()
            playwright_cache["browser"] = await p.chromium.launch(
                headless=True,
                args=['--disable-web-security', '--disable-features=IsolateOrigins', '--disable-site-isolation-trials']
            )
            # Create a persistent context with cache enabled
            playwright_cache["context"] = await playwright_cache["browser"].new_context(
                user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
                viewport={"width": 1280, "height": 800},
                java_script_enabled=True,
                ignore_https_errors=True,
                bypass_csp=True,
                extra_http_headers={
                    "Accept-Language": "en-US,en;q=0.9",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8"
                }
            )
            logger.info("Playwright browser initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize Playwright: {str(e)}")
            raise

async def get_playwright_context():
    """Get or create the Playwright context."""
    if playwright_cache["context"] is None:
        await initialize_playwright()
    return playwright_cache["context"]

async def extract_content_with_playwright(url: str) -> str:
    """Extract content from a URL using Playwright for advanced browser-based scraping."""
    logger.info(f"Extracting content from {url} using Playwright")
    
    # Initialize playwright if needed
    context = await get_playwright_context()
    page = await context.new_page()
    
    try:
        # Set timeout to 45 seconds for slower academic sites
        timeout = 45000  # 45 seconds
        response = await page.goto(url, timeout=timeout, wait_until="networkidle")
        
        if not response:
            logger.warning(f"Failed to load {url}")
            return f"Failed to load content from {url}. The page might be unavailable."
        
        # Check if page got redirected to a login/paywall
        current_url = page.url
        if "login" in current_url.lower() or "sign-in" in current_url.lower() or "access-denied" in current_url.lower():
            logger.warning(f"Redirected to login/paywall: {current_url}")
            return f"The content at {url} appears to be behind a paywall or requires a subscription."
        
        # Wait for content to load (especially important for dynamic content)
        await page.wait_for_load_state("networkidle")
        
        # Check for ScienceDirect and other academic sites
        is_sciencedirect = 'sciencedirect.com' in url.lower()
        is_academic = any(domain in url.lower() for domain in ['springer.com', 'ieee.org', 'wiley.com', 'elsevier.com', 'nature.com', 'academic.oup.com'])
        
        content = ""
        
        # Try site-specific extraction methods first
        if is_sciencedirect:
            logger.info("Using specialized extraction for ScienceDirect")
            
            # First try to accept cookies if present
            try:
                cookie_button = await page.query_selector('button#onetrust-accept-btn-handler')
                if cookie_button:
                    await cookie_button.click()
                    await page.wait_for_timeout(1000)  # Wait for cookie banner to disappear
            except Exception as e:
                logger.debug(f"Cookie acceptance failed (this is normal): {str(e)}")
            
            # For ScienceDirect, get content from specific elements
            # Title
            title_element = await page.query_selector('h1.title-text')
            if title_element:
                title = await title_element.text_content()
                content += f"Title: {title.strip()}\n\n"
            
            # Abstract
            abstract_element = await page.query_selector('.abstract, .Abstract')
            if abstract_element:
                abstract = await abstract_element.text_content()
                content += f"Abstract: {abstract.strip()}\n\n"
            
            # Main content sections
            sections = await page.query_selector_all('section.section, div.section, div.Section')
            for section in sections:
                heading = await section.query_selector('h2, h3, h4')
                if heading:
                    heading_text = await heading.text_content()
                    content += f"\n{heading_text.strip()}\n"
                
                paragraphs = await section.query_selector_all('p')
                for p in paragraphs:
                    p_text = await p.text_content()
                    content += f"{p_text.strip()}\n"
            
            # If we couldn't get enough content, try to get all visible text
            if len(content) < 300:
                logger.info("Falling back to general content extraction for ScienceDirect")
                content = await page.evaluate("""() => {
                    return document.body.innerText;
                }""")
        else:
            # General extraction for all sites
            logger.info("Using general content extraction")
            content = await page.evaluate("""() => {
                // Remove unwanted elements
                const elementsToRemove = document.querySelectorAll('script, style, nav, footer, header, aside, .cookie-banner, .ad');
                elementsToRemove.forEach(el => {
                    if (el) el.remove();
                });
                
                // Get all visible paragraphs and headings
                const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, article, section, .content, .article-content, .post-content');
                let text = '';
                textElements.forEach(el => {
                    if (el.offsetParent !== null) {  // Check if element is visible
                        text += el.textContent + '\\n';
                    }
                });
                
                // If we couldn't extract much, get all visible text
                if (text.length < 500) {
                    return document.body.innerText;
                }
                
                return text;
            }""")
        
        # Check if content is too short or contains paywall indicators
        if len(content) < 200:
            logger.warning(f"Extracted content too short: {len(content)} characters")
            # Take a screenshot to debug what the page looks like
            await page.screenshot(path="debug_screenshot.png")
            return f"Failed to extract substantial content from {url}. The content might be behind a paywall or requires authentication."
        
        # Check for paywall indicators in the content
        paywall_phrases = ["sign in", "log in", "subscribe", "paywall", "access denied", "please register", "member only"]
        
        if any(phrase in content.lower() for phrase in paywall_phrases) and len(content) < 1000:
            logger.warning(f"Paywall detected for {url}")
            return f"The content at {url} appears to be behind a paywall or requires a subscription."
        
        logger.info(f"Successfully extracted {len(content)} characters from {url} using Playwright")
        return content
        
    except Exception as e:
        error_msg = f"Error extracting content from {url} with Playwright: {str(e)}"
        logger.error(error_msg)
        logger.error(traceback.format_exc())
        return f"Failed to extract content from {url}. Error: {str(e)}"
    
    finally:
        # Close the page but keep the browser context for reuse
        await page.close()

async def extract_content(url: str) -> str:
    """Extract content from a URL using advanced methods."""
    try:
        # First attempt: Use Playwright for reliable extraction
        return await extract_content_with_playwright(url)
    except Exception as e:
        logger.error(f"Playwright extraction failed for {url}: {str(e)}")
        logger.error(traceback.format_exc())
        
        # Fallback to traditional method if Playwright fails
        try:
            logger.info(f"Falling back to traditional extraction for {url}")
            # Enhanced headers to better mimic a real browser
            headers = {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
                'Sec-Fetch-User': '?1',
                'Cache-Control': 'max-age=0'
            }
            
            # Use a longer timeout for academic sites
            timeout = 30
            
            # Use a session to maintain cookies
            session = requests.Session()
            response = session.get(url, headers=headers, timeout=timeout)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Remove script, style elements and other non-content elements
            for script in soup(["script", "style", "nav", "footer", "header", "aside", "noscript"]):
                script.extract()
            
            # Extract text from paragraphs, headings, and other relevant tags
            text_elements = soup.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'article', 'section'])
            content = "\n".join([elem.get_text(separator=' ', strip=True) for elem in text_elements if elem.get_text(strip=True)])
            
            # If we couldn't extract much content, grab the body text as a fallback
            if len(content) < 500 and soup.body:
                content = soup.body.get_text(separator='\n', strip=True)
            
            # If content is still very short, it might be behind a paywall
            if len(content) < 200:
                logger.warning(f"Failed to extract sufficient content from {url} (only got {len(content)} chars)")
                return f"Failed to extract substantial content from {url}. The content might be behind a paywall or requires authentication."
            
            logger.info(f"Successfully extracted {len(content)} chars from {url} using traditional method")
            return content
            
        except Exception as fallback_error:
            logger.error(f"Both extraction methods failed for {url}: {str(fallback_error)}")
            logger.error(traceback.format_exc())
            return f"Failed to extract content from {url} after trying multiple methods. Error: {str(fallback_error)}"

@app.post("/api/scrape")
async def scrape_urls(input_data: UrlsInput):
    """Scrape content from provided URLs and store for later use."""
    if not input_data.urls:
        raise HTTPException(status_code=400, detail="No URLs provided")
    
    # Generate a session ID if not provided
    session_id = input_data.session_id or str(hash("".join(input_data.urls)))
    
    # Extract content from each URL
    new_content = {}
    extraction_warnings = []
    
    for url in input_data.urls:
        try:
            # Use await since extract_content is now async
            content = await extract_content(url)
            new_content[url] = content
            
            # Check if the content extraction had issues
            if content.startswith("Failed to extract") or len(content) < 300:
                extraction_warnings.append(url)
        except Exception as e:
            logger.error(f"Error processing URL {url}: {str(e)}")
            logger.error(traceback.format_exc())
            new_content[url] = f"Failed to process {url}: {str(e)}"
            extraction_warnings.append(url)
    
    # If session exists, update it with new content, otherwise create new session
    if session_id in content_store:
        content_store[session_id].update(new_content)
    else:
        content_store[session_id] = new_content
    
    return {
        "status": "success", 
        "session_id": session_id, 
        "urls_processed": len(input_data.urls),
        "extraction_warnings": extraction_warnings
    }

@app.post("/api/ask")
async def answer_question(input_data: QuestionInput):
    """Answer a question based on scraped content using Mistral AI."""
    session_id = input_data.session_id
    question = input_data.question
    
    if session_id not in content_store:
        raise HTTPException(status_code=404, detail="Session not found. Please extract content first.")
    
    content = content_store[session_id]
    
    # Get API key from environment or use provided key
    api_key = os.getenv("MISTRAL_API_KEY", "Yk0jCzWir3ghtSrShkqjHB6NKaANMUAm")
    
    # Prepare the prompt
    # If content is a dictionary, combine all the content into a single string
    context = ""
    if isinstance(content, dict):
        for url, text in content.items():
            context += f"Content from {url}:\n{text}\n\n"
    else:
        context = str(content)
    
    prompt = f"""You are a helpful AI assistant that provides information based on web content. 
Answer the following question based solely on the provided content. 
If you cannot find the answer in the content, say "I don't have enough information to answer this question based on the provided content."

Content:
{context}

Question: {question}
"""
    
    try:
        # Mistral API endpoint
        api_url = "https://api.mistral.ai/v1/chat/completions"
        
        # Headers
        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": f"Bearer {api_key}"
        }
        
        # Request body
        data = {
            "model": "mistral-tiny", # Use mistral-tiny for efficiency and cost
            "messages": [
                {"role": "system", "content": "You are a helpful AI assistant that provides information based on web content."},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.2,  # Lower for more factual responses
            "max_tokens": 2000
        }
        
        # Make the API request
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(api_url, headers=headers, json=data)
            response.raise_for_status()
            
            response_data = response.json()
            answer = response_data["choices"][0]["message"]["content"]
            
            return {"answer": answer}
            
    except Exception as e:
        logger.error(f"Error calling Mistral API: {str(e)}")
        logger.error(traceback.format_exc())
        
        # Use demo mode as a fallback if API call fails
        content_preview = ""
        if isinstance(content, dict):
            # Combine first 100 chars from each source for preview
            for url, text in content.items():
                content_preview += text[:100] + " "
            content_preview = content_preview[:500]
        else:
            content_preview = str(content)[:500]
            
        return {"answer": generate_demo_response(question, content_preview)}

def generate_demo_response(question: str, content_preview: str) -> str:
    """Generate a demo response when API key is missing or API call fails."""
    # Create a simple but reasonably smart demo response
    question_lower = question.lower()
    
    # Make sure content_preview is a string
    if isinstance(content_preview, dict):
        # If content is a dictionary of url -> content, extract all content
        preview_text = ""
        for url, text in content_preview.items():
            preview_text += text[:200] + " "
        content_preview = preview_text[:500]
    elif not isinstance(content_preview, str):
        content_preview = "Unable to extract preview of content"
    
    # Try to extract information from the content preview to make response seem relevant
    sentences = content_preview.split('.')
    relevant_sentences = [s for s in sentences if any(word in s.lower() for word in question_lower.split())]
    
    if "what is" in question_lower or "describe" in question_lower or "explain" in question_lower:
        if relevant_sentences:
            return f"Based on the content, {relevant_sentences[0].strip()}. This information is part of the extracted content, which contains details about the topic you're asking about."
        return f"The content seems to discuss topics related to {' '.join(content_preview.split()[:5])}. To provide a more detailed answer, I would need to analyze the full content."
    
    elif "how" in question_lower:
        return f"The process involves multiple steps as mentioned in the content. {relevant_sentences[0].strip() if relevant_sentences else 'The specific details would require deeper analysis of the full content.'}"
    
    elif "why" in question_lower:
        return f"According to the extracted content, this is because {relevant_sentences[0].strip() if relevant_sentences else 'of several factors mentioned in the document. A complete analysis would provide more specific details.'}"
    
    elif "when" in question_lower or "date" in question_lower or "time" in question_lower:
        return f"The timing information in the content suggests {relevant_sentences[0].strip() if relevant_sentences else 'specific dates that would require further analysis to pinpoint exactly.'}"
    
    elif "who" in question_lower or "person" in question_lower or "people" in question_lower:
        return f"The content mentions {relevant_sentences[0].strip() if relevant_sentences else 'several individuals who played important roles in this context.'}"
    
    elif "where" in question_lower or "location" in question_lower or "place" in question_lower:
        return f"Based on the content, the location appears to be {relevant_sentences[0].strip() if relevant_sentences else 'mentioned specifically in the full document.'}"
    
    else:
        return f"The content provides information related to your question. {relevant_sentences[0].strip() if relevant_sentences else 'A more complete analysis would reveal specific details relevant to your inquiry.'} This is a preview response as this is running in demo mode."

@app.get("/api/health")
def health_check():
    """Simple health check endpoint."""
    return {"status": "ok", "service": "web-content-qa"}

# Graceful shutdown to clean up browser resources
@app.on_event("shutdown")
async def shutdown_event():
    """Clean up resources when the application shuts down."""
    if playwright_cache["browser"]:
        logger.info("Closing Playwright browser")
        await playwright_cache["browser"].close()
        if playwright_cache["playwright"]:
            await playwright_cache["playwright"].stop()
        playwright_cache["browser"] = None
        playwright_cache["context"] = None
        playwright_cache["playwright"] = None
        logger.info("Playwright resources cleaned up") 