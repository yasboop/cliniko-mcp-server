import os
import json
import asyncio
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
import requests
import httpx
import logging
from bs4 import BeautifulSoup
import uuid
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage

# Configure logging
logging.basicConfig(level=logging.INFO, 
                   format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger("clean-api")

app = FastAPI(title="Clean Content API", description="A clean implementation of the content extraction and QA API")

# Add CORS middleware to allow cross-origin requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins in development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory session storage
sessions: Dict[str, Dict] = {}

# Models
class ScrapingRequest(BaseModel):
    urls: List[str]

class QuestionRequest(BaseModel):
    session_id: str
    question: str

class ScrapingResponse(BaseModel):
    session_id: str
    message: str

class QuestionResponse(BaseModel):
    answer: str

# Mistral AI client setup with the provided API key
MISTRAL_API_KEY = "rVRInnNrj0m126vjrx6yCxOETxe29Z6W"
mistral_client = MistralClient(api_key=MISTRAL_API_KEY)

# Content extraction function
async def extract_content(url: str) -> str:
    """Extract readable content from a URL."""
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            }
            response = await client.get(url, headers=headers, follow_redirects=True)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, "html.parser")
            
            # Remove script and style elements
            for script in soup(["script", "style", "header", "footer", "nav"]):
                script.extract()
                
            # Get text
            text = soup.get_text(separator="\n", strip=True)
            
            # Clean up text
            lines = (line.strip() for line in text.splitlines())
            chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
            text = "\n".join(chunk for chunk in chunks if chunk)
            
            # Truncate to reasonable size if needed
            if len(text) > 15000:
                text = text[:15000] + "...[truncated due to length]"
                
            return text
    except Exception as e:
        return f"Error extracting content from {url}: {str(e)}"

# API endpoints
@app.post("/api/scrape", response_model=ScrapingResponse)
async def scrape_content(request: ScrapingRequest):
    """Scrape content from provided URLs and store in a session."""
    try:
        # Generate a session ID
        session_id = str(uuid.uuid4())
        
        # Extract content from URLs
        all_content = ""
        for url in request.urls:
            content = await extract_content(url)
            all_content += f"\n\nContent from {url}:\n{content}"
        
        # Store in session
        sessions[session_id] = {"content": all_content, "urls": request.urls}
        
        return {"session_id": session_id, "message": f"Successfully extracted content from {len(request.urls)} URLs"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during scraping: {str(e)}")

@app.post("/api/ask", response_model=QuestionResponse)
async def ask_question(request: QuestionRequest):
    """Answer a question based on previously scraped content."""
    try:
        # Check if session exists
        if request.session_id not in sessions:
            raise HTTPException(status_code=404, detail="Session not found")
        
        # Get content from session
        content = sessions[request.session_id]["content"]
        
        # Generate answer using Mistral AI
        try:
            messages = [
                ChatMessage(role="system", content="You are a helpful assistant that answers questions based on provided content. Provide well-structured, comprehensive responses with the following guidelines:\n\n1. Use clear formatting with paragraphs, bullet points, and numbered lists where appropriate\n2. For technical or scientific topics, include clear definitions\n3. For complex answers, use headings (e.g., '# Main Point') to organize information\n4. Use bullet points for listing features, characteristics, or examples\n5. Use numbered lists for sequential information, steps or ranked items\n6. Bold important terms or key concepts using **term**\n7. Add visual structure with --- as separators for different sections when appropriate\n8. Only use information found in the provided content. If the answer cannot be found in the content, say so."),
                ChatMessage(role="user", content=f"Here is content that I've extracted from webpages:\n\n{content}\n\nBased only on this content, please answer the following question: {request.question}\n\nProvide a comprehensive, well-structured answer with appropriate formatting.")
            ]
            
            response = mistral_client.chat(
                model="mistral-small",
                messages=messages,
                max_tokens=1500,
                temperature=0.7,
            )
            
            answer = response.choices[0].message.content
            return {"answer": answer}
        except Exception as e:
            # Fallback if Mistral API fails
            return {"answer": f"Sorry, I encountered an issue while processing your question: {str(e)}. Please try again later."}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing question: {str(e)}")

@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001) 