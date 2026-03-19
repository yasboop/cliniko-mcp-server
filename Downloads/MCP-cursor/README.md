# Web Content Q&A Tool

A web application that allows users to ingest content from multiple URLs and ask questions about that content. The application uses Next.js for the frontend, FastAPI for the backend, and Mistral AI for generating answers based only on the ingested content.

## Screenshots

![AiSensy Content Intelligence UI](https://i.imgur.com/X9pn0d2.png)

*AiSensy Content Intelligence - Q&A interface showing content ingestion from Wikipedia*

## Features

- **Multi-URL Content Ingestion**: Input one or multiple webpage URLs to analyze
- **Content-Based Q&A**: Questions are answered strictly using the ingested content
- **Concise, Accurate Answers**: Powered by Mistral AI's language model
- **Modern UI**: Clean, responsive interface built with Next.js and TailwindCSS
- **No Persistent Storage**: Content is stored in-memory for the session only
- **Dark/Light Theme**: Toggle between light and dark modes for comfortable viewing
- **Local Development**: Easily run the entire application locally with a simple setup

## Tech Stack

- **Frontend**: Next.js with React, TailwindCSS for styling
- **Backend**: FastAPI (Python) with httpx for async HTTP requests
- **Content Extraction**: Beautiful Soup for HTML parsing
- **AI Integration**: Mistral AI API for content-based question answering
- **Development**: Unified development environment with concurrent frontend/backend servers

## Prerequisites

- Node.js (v14+)
- Python (v3.8+)
- Mistral AI API key (obtainable from [Mistral AI Platform](https://console.mistral.ai/))

## Installation and Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yasboop/Web-Content-QA-Tool.git
   cd Web-Content-QA-Tool
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   # Create and activate a virtual environment (recommended)
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate

   # Install dependencies
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   - Copy `.env.example` to `.env`
   ```bash
   cp .env.example .env
   ```
   - The example file already contains a sample Mistral API key for testing
   - For production use, replace it with your own Mistral API key

5. Run the development server (frontend + backend):
   ```bash
   node dev.js
   ```
   This command starts both the Next.js frontend server and the FastAPI backend server concurrently.

6. Open [http://localhost:3000](http://localhost:3000) in your browser to use the application

## Usage Instructions

1. **Adding Content Sources**:
   - Enter one or more URLs in the input field
   - The system will validate the URLs and indicate compatibility
   - Click "Ingest Content" to extract information from the URLs

2. **Asking Questions**:
   - After content is ingested, you can type questions in the right panel
   - Questions will be answered based only on the content from the provided URLs
   - The system supports follow-up questions within the same session

3. **Starting a New Session**:
   - Click "Start New Session" to clear all ingested content and start fresh

## Project Structure

```
web-content-qa/
├── api/                  # FastAPI backend
│   ├── index.py          # Main API with advanced content extraction
│   ├── simple_api.py     # Simplified API version
│   └── clean_api.py      # Clean implementation with Mistral integration
├── components/           # React components
├── pages/                # Next.js pages
│   ├── api/              # Next.js API routes (proxies to FastAPI)
│   ├── _app.js          
│   └── index.js          # Main application page
├── public/               # Static assets
├── styles/               # CSS files
├── utils/                # Utility functions
├── dev.js                # Combined dev server (Next.js + FastAPI)
├── next.config.js        # Next.js configuration
├── package.json          # Node dependencies
├── requirements.txt      # Python dependencies
└── .env.example          # Example environment variables
```

## How It Works

1. **Content Ingestion**:
   - User enters one or more URLs
   - Backend extracts content using HTTP requests and BeautifulSoup
   - Content is stored in memory for the current session

2. **Session Management**:
   - Each content extraction session gets a unique ID
   - Content is stored in-memory for the session duration
   - No persistent storage - data is lost on server restart

3. **Question Answering**:
   - User asks a question about the ingested content
   - Question + extracted content are sent to Mistral AI
   - AI generates an answer strictly based on provided content
   - Fallback mechanisms handle API failures by using simple content matching

## API Reference

### `/api/scrape` (POST)
Extracts content from provided URLs.

**Request Body**:
```json
{
  "urls": ["https://example.com", "https://example2.com"],
  "session_id": "optional-existing-session-id"
}
```

**Response**:
```json
{
  "session_id": "generated-or-provided-session-id",
  "extraction_warnings": ["urls-with-extraction-issues"]
}
```

### `/api/ask` (POST)
Answers questions based on previously extracted content.

**Request Body**:
```json
{
  "question": "What is mentioned about X?",
  "session_id": "your-session-id"
}
```

**Response**:
```json
{
  "answer": "Based on the extracted content, X is described as..."
}
```

## Local Development Mode

The application includes a local fallback mode that works even without a valid Mistral API key. In this mode:

1. Content extraction from URLs works normally
2. Question answering uses simple keyword matching instead of the AI model
3. Answers will include a debug message indicating that it's running in local fallback mode

This allows for development and testing of the application flow without requiring an API key.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org)
- [FastAPI](https://fastapi.tiangolo.com)
- [Mistral AI](https://mistral.ai)
- [TailwindCSS](https://tailwindcss.com)
- [Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/)
