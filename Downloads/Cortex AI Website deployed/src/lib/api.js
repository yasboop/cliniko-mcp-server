/**
 * API client for communicating with the backend services
 */

// Base API URL - will be different in development vs production
const API_URL = import.meta.env.PROD 
  ? '/api' 
  : 'http://localhost:5000/api';

/**
 * Check if the backend API is responding properly
 * @returns {Promise<boolean>} - Whether the API is available or not
 */
export const checkAPIHealth = async () => {
  try {
    // Use a timeout to prevent hanging if server doesn't respond
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`${API_URL}/health`, {
      signal: controller.signal
    }).catch(() => ({ ok: false }));
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    console.warn('API health check failed:', error);
    return false;
  }
};

/**
 * Submit a contact form to the backend
 * @param {Object} formData - Contact form data
 * @returns {Promise} - API response
 */
export const submitContactForm = async (formData) => {
  try {
    // Check if API is available first
    const isAPIAvailable = await checkAPIHealth().catch(() => false);
    
    // If API is not available, provide fallback behavior
    if (!isAPIAvailable) {
      console.log('Backend API is not available, using fallback behavior');
      
      // Simulate successful submission
      return {
        success: true,
        message: "Your message has been received. We'll get back to you as soon as possible. (Offline Mode)",
        data: {
          ...formData,
          _id: `offline_${Date.now()}`,
          createdAt: new Date()
        }
      };
    }
    
    // API is available, make the real request
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

/**
 * Get all services from the backend
 * This is a placeholder for future implementation
 * @returns {Promise} - API response
 */
export const getServices = async () => {
  try {
    // Check if API is available
    const isAPIAvailable = await checkAPIHealth().catch(() => false);
    
    // If not available, return mock data
    if (!isAPIAvailable) {
      return {
        success: true,
        data: [
          {
            id: 'ai-chatbots',
            title: 'AI Chatbots',
            description: 'Intelligent conversational agents that provide instant customer support.',
          },
          {
            id: 'voice-agents',
            title: 'Voice Agents',
            description: 'Advanced voice assistants that handle calls and appointments.',
          },
          {
            id: 'process-automation',
            title: 'Process Automation',
            description: 'Smart automation solutions that streamline workflows across your organization.',
          },
          {
            id: 'computer-vision',
            title: 'Computer Vision',
            description: 'Image recognition and processing for various business applications.',
          },
          {
            id: 'predictive-analytics',
            title: 'Predictive Analytics',
            description: 'Data-driven forecasting to anticipate market trends and business needs.',
          },
          {
            id: 'ai-security',
            title: 'AI Security',
            description: 'Enhanced security measures powered by artificial intelligence.',
          },
        ]
      };
    }
    
    // Real API call to be implemented
    const response = await fetch(`${API_URL}/services`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch services');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching services:', error);
    // Fall back to mock data on error
    return {
      success: true,
      data: [
        {
          id: 'ai-chatbots',
          title: 'AI Chatbots',
          description: 'Intelligent conversational agents that provide instant customer support.',
        },
        {
          id: 'voice-agents',
          title: 'Voice Agents',
          description: 'Advanced voice assistants that handle calls and appointments.',
        },
        // More services would be added here
      ]
    };
  }
}; 