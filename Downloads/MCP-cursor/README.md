# Web Content Q&A Tool

A web application that allows users to ingest content from multiple URLs and ask questions about that content. The application uses Next.js for the frontend, FastAPI for the backend, and Mistral AI for generating answers based only on the ingested content.

## Features

- **Multi-URL Content Ingestion**: Input one or multiple webpage URLs to analyze
- **Content-Based Q&A**: Questions are answered strictly using the ingested content
- **Concise, Accurate Answers**: Powered by Mistral AI's language model
- **Modern UI**: Clean, responsive interface built with Next.js and TailwindCSS
- **No Persistent Storage**: Content is stored in-memory for the session only
- **Vercel Deployment**: Easily deployable on Vercel's free tier

## Prerequisites

- Node.js (v14+)
- Python (v3.8+)
- Mistral AI API key (obtainable from [Mistral AI Platform](https://console.mistral.ai/))
- Vercel account (for deployment)

## Local Development Setup

1. **Clone the repository**:
```bash
git clone <repository-url>
cd web-content-qa
```

2. **Install Node.js dependencies**:
```bash
npm install
```

3. **Install Python dependencies**:
```bash
pip install -r requirements.txt
```

4. **Create a `.env` file** in the root directory with your Mistral AI API key:
```bash
MISTRAL_API_KEY=your_mistral_api_key_here
```

5. **Start the development servers**:

In one terminal, start the FastAPI server:
```bash
cd api
uvicorn index:app --reload --port 8000
```

In another terminal, start the Next.js development server:
```bash
npm run dev
```

6. **Open your browser** and navigate to `http://localhost:3000`

## Deployment on Vercel

1. **Push your code to a GitHub repository**

2. **Connect your repository to Vercel**:
   - Log in to your [Vercel account](https://vercel.com/)
   - Click "Add New..."
   - Select "Project"
   - Choose your GitHub repository
   - Click "Import"

3. **Configure environment variables**:
   - Add your Mistral API key as an environment variable named `MISTRAL_API_KEY`

4. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete
   - Once deployed, you'll receive a URL for your live application

## Usage

1. **Enter URLs**:
   - On the application's home page, enter one or more URLs into the text area
   - URLs can be separated by newlines or commas
   - Click "Ingest Content" to scrape and process the web content

2. **Ask questions**:
   - After content ingestion, type your question in the input field
   - Click "Ask Question" to get an answer based on the ingested content
   - The answer will appear below the question form

3. **Start a new session**:
   - To analyze different content, click "Start New Session"
   - This will clear the current session and allow you to enter new URLs

## Architecture

The application follows a simple yet effective architecture:

1. **Frontend (Next.js)**:
   - User interface for inputting URLs and questions
   - Communicates with backend API endpoints

2. **Backend (FastAPI)**:
   - Web scraping using requests and BeautifulSoup
   - Session management for storing scraped content
   - Integration with Mistral AI API for question answering

3. **AI Integration (Mistral AI)**:
   - Language model that generates answers based on provided context
   - Ensures answers are grounded in the ingested content

## Limitations

- **Content Size**: Very large websites with many pages may not be fully ingested
- **JavaScript-Heavy Sites**: Some dynamic content might not be captured (the scraper relies primarily on static HTML)
- **Rate Limiting**: Excessive usage might trigger rate limits from the Mistral AI API or websites being scraped

## Security Considerations

- **API Key**: Never expose your Mistral AI API key in client-side code
- **Content Privacy**: Content is stored temporarily in memory and not persisted to a database
- **URL Access**: Only publicly accessible URLs can be scraped

## License

[MIT License](LICENSE) 