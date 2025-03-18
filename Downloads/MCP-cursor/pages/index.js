import { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  // States for form inputs and responses
  const [urls, setUrls] = useState([''])
  const [sessionId, setSessionId] = useState('')
  const [question, setQuestion] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isPreparing, setIsPreparing] = useState(false)
  const [error, setError] = useState('')
  const [messages, setMessages] = useState([])
  const [contentLoaded, setContentLoaded] = useState(false)
  const [siteCompatibility, setSiteCompatibility] = useState({
    status: 'waiting', // 'waiting', 'compatible', 'warning', 'incompatible'
    message: ''
  })
  const [theme, setTheme] = useState('light') // 'light' or 'dark'

  const conversationEndRef = useRef(null)
  const urlInputRef = useRef(null)
  
  // Auto-scroll to bottom of conversation when new messages are added
  useEffect(() => {
    if (conversationEndRef.current) {
      conversationEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Validate URL input when it changes
  useEffect(() => {
    if (urls[0]) {
      // Reset site compatibility status
      setSiteCompatibility({ status: 'waiting', message: '' })
      
      try {
        // Check URL format validity
        new URL(urls[0])
        
        // Determine site compatibility based on the domain
        const domain = new URL(urls[0]).hostname.toLowerCase()
        
        if (domain.includes('wikipedia.org') || 
            domain.includes('bbc.com') || 
            domain.includes('nytimes.com') || 
            domain.includes('github.com')) {
          setSiteCompatibility({
            status: 'compatible',
            message: 'Public site - likely to work well'
          })
        } else if (domain.includes('sciencedirect.com') || 
                  domain.includes('springer.com') || 
                  domain.includes('ieee.org') || 
                  domain.includes('academia.edu') ||
                  domain.includes('researchgate.net')) {
          setSiteCompatibility({
            status: 'warning',
            message: 'Academic site - may have limited access or require subscription'
          })
        }
      } catch (e) {
        // Invalid URL format - don't show any status until it's valid
        if (urls[0].length > 10) {
          setSiteCompatibility({
            status: 'incompatible',
            message: 'Invalid URL format'
          })
        }
      }
    }
  }, [urls[0]])

  // Add a new URL input field
  const addUrlField = () => {
    setUrls([...urls, ''])
  }

  // Handle URL input change
  const updateUrl = (index, value) => {
    const newUrls = [...urls]
    newUrls[index] = value
    setUrls(newUrls)
  }

  // Scrape content from provided URLs
  const handleScrapeContent = async () => {
    // Filter out empty URLs
    const validUrls = urls.filter(url => url.trim() !== '')
    
    if (validUrls.length === 0) {
      setError('Please enter at least one valid URL')
      return
    }
    
    setIsPreparing(true)
    setError('')
    
    try {
      // Prepare API request payload
      const payload = {
        urls: validUrls,
        session_id: sessionId || undefined
      }
      
      // Make API request to scrape content
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      
      // Handle API response
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to scrape content')
      }
      
      // Store session ID for future requests
      setSessionId(data.session_id)
      setContentLoaded(true)
      
      // Add system message about content extraction
      let systemMessage = {
        role: 'system',
        content: `Content extracted from ${validUrls.length} URL${validUrls.length > 1 ? 's' : ''}.`
      }
      
      // Add warning if some URLs had extraction issues
      if (data.extraction_warnings && data.extraction_warnings.length > 0) {
        systemMessage.content += ` Note: Could not fully extract content from ${data.extraction_warnings.length} source${data.extraction_warnings.length > 1 ? 's' : ''}.`
        systemMessage.warning = true
      }
      
      setMessages(prev => [...prev, systemMessage])
      
    } catch (error) {
      setError(error.message || 'Failed to extract content. Please try another URL.')
    } finally {
      setIsPreparing(false)
    }
  }

  // Ask a question about the scraped content
  const handleAskQuestion = async (e) => {
    e.preventDefault()
    
    if (!question.trim()) {
      return
    }
    
    if (!sessionId && !contentLoaded) {
      setError('Please ingest content from URLs first.')
      return
    }
    
    // Add user question to messages
    setMessages(prev => [...prev, { role: 'user', content: question }])
    
    setIsLoading(true)
    setError('')
    
    try {
      // Prepare API request payload
      const payload = {
        question,
        session_id: sessionId
      }
      
      // Make API request to ask question
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      
      // Handle API response
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to get answer')
      }
      
      // Add assistant response to messages
      setMessages(prev => [...prev, { role: 'assistant', content: data.answer }])
      
      // Clear the question input
      setQuestion('')
      
    } catch (error) {
      setError(error.message || 'Failed to get an answer. Please try another question.')
    } finally {
      setIsLoading(false)
    }
  }

  // Start a new session
  const startNewSession = () => {
    setSessionId('')
    setUrls([''])
    setQuestion('')
    setMessages([])
    setContentLoaded(false)
    setError('')
    setSiteCompatibility({ status: 'waiting', message: '' })
    
    // Focus on URL input
    if (urlInputRef.current) {
      urlInputRef.current.focus()
    }
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-cyan-50 to-white' 
      : 'bg-gradient-to-br from-slate-900 to-gray-800'}`}>
      <Head>
        <title>AiSensy Content Intelligence</title>
        <meta name="description" content="AiSensy Content Q&A Tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container max-w-5xl mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-8 relative">
          <div className="flex items-center">
            <div className="mr-3">
              {/* Official AiSensy Logo */}
              <div className="w-10 h-10 overflow-hidden rounded-lg">
                <svg width="40" height="40" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="512" height="512" rx="100" fill="#00D37F"/>
                  <path d="M192.5 340.667H160.667V171.333H192.5V340.667Z" fill="white"/>
                  <path d="M128.834 340.667H97.0006V235.25H128.834V340.667Z" fill="white"/>
                  <path d="M256.167 340.667H224.334V107.417H256.167V340.667Z" fill="white"/>
                  <path d="M319.833 340.667H288V235.25H319.833V340.667Z" fill="white"/>
                  <path d="M383.5 340.667H351.667V171.333H383.5V340.667Z" fill="white"/>
                  <path d="M415.333 171.333V139.5H97.0001V171.333H415.333Z" fill="white"/>
                  <path d="M415.333 235.25V203.417H288V235.25H415.333Z" fill="white"/>
                  <path d="M192.5 235.25V203.417H97.0001V235.25H192.5Z" fill="white"/>
                  <path d="M415.333 299.164V267.334H97.0001V299.164H415.333Z" fill="white"/>
                  <path d="M415.333 363.084V331.25H97.0001V363.084H415.333Z" fill="white"/>
                  <path d="M415.333 426.997V395.167H97.0001V426.997H415.333Z" fill="white"/>
                </svg>
              </div>
            </div>
            <div>
              <h1 className={`text-2xl md:text-3xl font-bold ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>
                AiSensy Content Intelligence
        </h1>
              <p className={`text-sm ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                Extract insights from any content with AI
              </p>
            </div>
            </div>
            
              <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full ${theme === 'light' ? 'bg-slate-200 text-slate-700' : 'bg-slate-700 text-slate-200'}`}
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </header>

        {/* Main panel with a subtle blur-backdrop effect */}
        <div className={`relative rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl ${theme === 'light' ? 'bg-white/80' : 'bg-slate-800/80'}`}>
          {/* Top accent bar with gradient */}
          <div className="h-1.5 w-full bg-gradient-to-r from-teal-400 via-emerald-500 to-cyan-500"></div>
          
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left panel - URL input */}
              <div className="lg:col-span-1">
                <div className={`p-5 rounded-xl mb-6 ${theme === 'light' 
                  ? 'bg-gradient-to-br from-emerald-50 to-cyan-50 border border-emerald-100'
                  : 'bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-700'}`}>
                  <h2 className={`text-lg font-semibold mb-4 flex items-center ${theme === 'light' ? 'text-emerald-800' : 'text-emerald-400'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                    Add Content Sources
                  </h2>
                  
                  <div className="space-y-4">
                    {urls.map((url, index) => (
                      <div key={index} className="relative">
                        <input
                          type="url"
                          ref={index === 0 ? urlInputRef : null}
                          value={url}
                          onChange={(e) => updateUrl(index, e.target.value)}
                          placeholder="Enter URL"
                          className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-emerald-500 shadow-sm 
                            ${theme === 'light' 
                              ? 'border border-gray-200 focus:border-emerald-500 bg-white text-slate-800'
                              : 'border border-slate-600 focus:border-emerald-500 bg-slate-700 text-white'
                            }`}
                          disabled={isPreparing}
                        />
                        
                        {/* Site compatibility indicator (only show for first URL) */}
                        {index === 0 && siteCompatibility.status !== 'waiting' && url && (
                          <div className={`mt-2 text-sm flex items-center ${
                            siteCompatibility.status === 'compatible' 
                              ? 'text-emerald-600 dark:text-emerald-400' 
                              : siteCompatibility.status === 'warning' 
                                ? 'text-amber-600 dark:text-amber-400'
                                : 'text-red-600 dark:text-red-400'
                          }`}>
                            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                              siteCompatibility.status === 'compatible' 
                                ? 'bg-emerald-500' 
                                : siteCompatibility.status === 'warning' 
                                  ? 'bg-amber-500'
                                  : 'bg-red-500'
                            }`}></span>
                            {siteCompatibility.message}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex flex-col space-y-3">
                    <button
                      type="button"
                      onClick={addUrlField}
                      className={`px-4 py-2 text-sm font-medium flex items-center transition-colors duration-200
                        ${theme === 'light' 
                          ? 'text-emerald-600 hover:text-emerald-700' 
                          : 'text-emerald-400 hover:text-emerald-300'
                        }`}
                      disabled={isPreparing}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      Add another URL
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleScrapeContent}
                      className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none"
                      disabled={isPreparing || urls.every(url => !url.trim())}
                    >
                      {isPreparing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          Ingest Content
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Error message display */}
                {error && (
                  <div className={`rounded-lg px-4 py-3 mb-4 ${theme === 'light'
                    ? 'bg-red-50 border border-red-200 text-red-800'
                    : 'bg-red-900/20 border border-red-800/30 text-red-300'}`}>
                    <div className="flex">
                      <svg className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>{error}</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Right panel - Q&A section */}
              <div className="lg:col-span-2">
                <div className={`p-5 rounded-xl ${theme === 'light' 
                  ? 'bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200'
                  : 'bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-700'}`}>
                  
                  <h2 className={`text-lg font-semibold mb-4 flex items-center ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    Ask Questions About Content
                  </h2>
                  
                  {/* Conversation history */}
                  {messages.length > 0 ? (
                    <div className={`mb-6 max-h-[400px] overflow-y-auto rounded-lg p-4 conversation-container ${theme === 'light' 
                      ? 'bg-white/70 border border-slate-200'
                      : 'bg-slate-800/50 border border-slate-700'}`}>
                      <div className="space-y-4">
                        {messages.map((message, index) => (
                          <div 
                            key={index} 
                            className={`message ${
                              message.role === 'user' 
                                ? 'user-message'
                                : message.role === 'system'
                                  ? 'system-message'
                                  : 'assistant-message'
                            }`}
                          >
                            {message.role === 'assistant' && (
                              <div className={`message-avatar ${theme === 'light' ? 'bg-emerald-100 text-emerald-600' : 'bg-emerald-900/30 text-emerald-400'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                </svg>
                              </div>
                            )}
                            
                            <div className="message-bubble">
                              <div className="message-role">
                                {message.role === 'user' && (
                                  <span className={theme === 'light' ? 'text-blue-600' : 'text-blue-400'}>You</span>
                                )}
                                {message.role === 'assistant' && (
                                  <span className={theme === 'light' ? 'text-emerald-600' : 'text-emerald-400'}>AiSensy</span>
                                )}
                                {message.role === 'system' && (
                                  <span className={`flex items-center ${
                                    message.warning 
                                      ? theme === 'light' ? 'text-amber-600' : 'text-amber-400'
                                      : theme === 'light' ? 'text-slate-500' : 'text-slate-400'
                                  }`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    System
                                  </span>
                                )}
                              </div>
                              <div className={`message-content ${
                                theme === 'light'
                                  ? message.role === 'user' 
                                    ? 'text-slate-800'
                                    : message.role === 'system'
                                      ? message.warning 
                                        ? 'text-amber-800'
                                        : 'text-slate-600'
                                      : 'text-slate-800'
                                  : message.role === 'user' 
                                    ? 'text-slate-200'
                                    : message.role === 'system'
                                      ? message.warning 
                                        ? 'text-amber-200'
                                        : 'text-slate-300'
                                      : 'text-slate-200'
                              }`}>
                                {message.role === 'assistant' 
                                  ? <div className="response-content">
                                      {message.content.split("\n\n").map((paragraph, i) => {
                                        // Check if this is a heading paragraph (starts with #)
                                        if (paragraph.trim().startsWith('# ')) {
                                          return (
                                            <div key={i} className="my-4 first:mt-1">
                                              <h2 className="text-lg font-bold border-b pb-1 mb-2 text-emerald-700 dark:text-emerald-400">
                                                {paragraph.replace(/^# /, '')}
                                              </h2>
                                            </div>
                                          );
                                        }
                                        
                                        // Check if this is a subheading (starts with ##)
                                        if (paragraph.trim().startsWith('## ')) {
                                          return (
                                            <div key={i} className="my-3 first:mt-1">
                                              <h3 className="text-base font-semibold mb-2 text-slate-700 dark:text-slate-300">
                                                {paragraph.replace(/^## /, '')}
                                              </h3>
                                            </div>
                                          );
                                        }
                                        
                                        // Check if this is a separator
                                        if (paragraph.trim() === '---') {
                                          return <hr key={i} className="my-4 border-slate-200 dark:border-slate-700" />;
                                        }
                                        
                                        return (
                                          <div key={i} className="mb-4 last:mb-1">
                                            {paragraph.split("\n").map((line, j) => {
                                              // Format lists
                                              if (line.match(/^\d+\.\s/)) {
                                                return (
                                                  <div key={j} className="flex items-start mb-2 pl-1">
                                                    <span className="font-semibold mr-2 text-emerald-700 dark:text-emerald-500">{line.match(/^\d+\./)[0]}</span>
                                                    <span className="flex-1">{line.replace(/^\d+\.\s/, '')}</span>
                                                  </div>
                                                );
                                              } 
                                              // Format bullet points
                                              else if (line.match(/^[\-\*]\s/)) {
                                                return (
                                                  <div key={j} className="flex items-start mb-2 pl-2">
                                                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 mt-2 mr-3"></span>
                                                    <span className="flex-1">{line.replace(/^[\-\*]\s/, '')}</span>
                                                  </div>
                                                );
                                              }
                                              // Format headings within a paragraph (shouldn't happen often)
                                              else if (line.match(/^#+\s/)) {
                                                const level = line.match(/^#+/)[0].length;
                                                const text = line.replace(/^#+\s/, '');
                                                const headingClasses = [
                                                  "text-lg font-bold my-3 text-emerald-700 dark:text-emerald-400",
                                                  "text-base font-semibold my-2 text-slate-700 dark:text-slate-300",
                                                  "text-sm font-medium my-2 text-slate-600 dark:text-slate-400"
                                                ];
                                                const className = headingClasses[Math.min(level - 1, 2)];
                                                return <div key={j} className={className}>{text}</div>;
                                              }
                                              // Format definitions or important terms
                                              else if (line.match(/^.+:\s/)) {
                                                const parts = line.split(/:\s(.+)/);
                                                if (parts.length >= 2 && parts[0].length < 30) {
                                                  return (
                                                    <div key={j} className="mb-2">
                                                      <span className="font-semibold text-slate-700 dark:text-slate-300">{parts[0]}:</span>{' '}
                                                      <span>{parts[1]}</span>
                                                    </div>
                                                  );
                                                }
                                              }
                                              // Handle bolded text with **text**
                                              else if (line.includes('**')) {
                                                // Split by ** markers
                                                const parts = line.split(/(\*\*.*?\*\*)/g);
                                                return (
                                                  <div key={j} className="mb-2">
                                                    {parts.map((part, k) => {
                                                      if (part.startsWith('**') && part.endsWith('**')) {
                                                        // This is bold text
                                                        return <strong key={k} className="font-semibold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
                                                      } else {
                                                        // Regular text
                                                        return <span key={k}>{part}</span>;
                                                      }
                                                    })}
                                                  </div>
                                                );
                                              }
                                              // Regular line
                                              return <div key={j} className="mb-2">{line}</div>;
                                            })}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  : message.content
                                }
                              </div>
        </div>
        
                            {message.role === 'user' && (
                              <div className={`message-avatar ${theme === 'light' ? 'bg-blue-100 text-blue-600' : 'bg-blue-900/30 text-blue-400'}`}>
                                <span>You</span>
                              </div>
                            )}
                            
                            {/* Optional timestamp */}
                            {false && (
                              <div className={`message-time ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`}>
                                {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </div>
                            )}
                          </div>
                        ))}
                        
                        {isLoading && (
                          <div className="message assistant-message">
                            <div className={`message-avatar ${theme === 'light' ? 'bg-emerald-100 text-emerald-600' : 'bg-emerald-900/30 text-emerald-400'}`}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                              </svg>
                            </div>
                            <div className="message-bubble">
                              <div className="message-role">
                                <span className={theme === 'light' ? 'text-emerald-600' : 'text-emerald-400'}>AiSensy</span>
                              </div>
                              <div className={`typing-indicator ${theme === 'light' ? 'text-emerald-500' : 'text-emerald-400'}`}>
                                <span></span>
                                <span></span>
                                <span></span>
                              </div>
                            </div>
                          </div>
                        )}
                        <div ref={conversationEndRef} />
                      </div>
                    </div>
                  ) : (
                    <div className={`mb-6 rounded-lg p-8 flex flex-col items-center justify-center ${theme === 'light' 
                      ? 'bg-white/70 border border-dashed border-slate-300'
                      : 'bg-slate-800/50 border border-dashed border-slate-600'}`}>
                      <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-500 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </div>
                      <h3 className={`text-lg font-medium mb-2 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>No conversations yet</h3>
                      <p className={`text-sm text-center max-w-xs ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                        Add content from URLs to start asking questions
                      </p>
                    </div>
                  )}
                  
                  <form onSubmit={handleAskQuestion}>
            <div className="mb-4">
                      <div className="relative">
                        <textarea
                id="question"
                          rows="3"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                          placeholder="What would you like to know about the content?"
                          className={`w-full px-4 py-3 rounded-2xl shadow-sm focus:ring-2 focus:ring-emerald-500 resize-none transition-all
                            ${theme === 'light'
                              ? 'border border-slate-200 focus:border-emerald-500 bg-white text-slate-800 placeholder-slate-400'
                              : 'border border-slate-700 focus:border-emerald-500 bg-slate-800 text-white placeholder-slate-500'
                            }`}
                          disabled={isLoading || !contentLoaded}
                        ></textarea>
                        
                        {contentLoaded && (
                          <div className="absolute right-3 bottom-3 flex space-x-2">
              <button 
                type="submit" 
                              className={`p-2.5 rounded-xl shadow transition-all duration-200 ${
                                isLoading 
                                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 hover:shadow-md hover:scale-105'
                              }`}
                              disabled={isLoading || !question.trim()}
                            >
                              {isLoading ? (
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                                </svg>
                              )}
              </button>
                          </div>
                        )}
                      </div>
                      
                      {!contentLoaded && (
                        <div className={`mt-2 flex justify-center py-3 rounded-lg ${theme === 'light' ? 'bg-slate-50 text-slate-500' : 'bg-slate-800 text-slate-400'}`}>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Add content from URLs to start asking questions</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-end">
              <button 
                type="button" 
                        onClick={startNewSession}
                        className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${theme === 'light'
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:shadow-sm'
                          : 'bg-slate-700 hover:bg-slate-600 text-slate-300 hover:shadow-sm'
                        }`}
                      >
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                Start New Session
                        </span>
              </button>
            </div>
          </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <footer className="text-center text-sm mt-10">
          <div className={`flex items-center justify-center gap-2 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
            <span>Powered by AiSensy</span>
            <span>•</span>
            <span>© {new Date().getFullYear()} AiSensy WhatsApp Marketing Platform</span>
          </div>
          <p className={`mt-1 text-xs ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`}>
            WhatsApp Marketing | Automated Notifications | Support Chat Platform
          </p>
        </footer>
      </main>
    </div>
  )
} 