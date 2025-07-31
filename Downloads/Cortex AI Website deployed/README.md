# Cortex AI - Premium AI Solutions

A modern, responsive website built with React and Vite for Cortex AI, featuring a clean design and interactive elements.

## 🚀 Features

- **Modern React Architecture**: Built with React 18 and Vite for optimal performance
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Interactive Animations**: Smooth animations with Framer Motion
- **3D Elements**: Three.js powered visual effects
- **Contact Form**: Integrated contact system with backend support
- **SEO Optimized**: Clean structure and meta tags

## 📁 Project Structure

```
cortex-ai/
├── src/                    # Source files
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── lib/               # Utilities and API functions
│   └── assets/            # Static assets
├── server/                # Express.js backend
├── dist/                  # Production build output
└── public/                # Public assets
```

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start backend server (optional)
npm run dev:server

# Run both frontend and backend
npm run dev:full
```

### Building for Production
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

### Option 1: Static Hosting (Frontend Only)
Deploy the `dist/` folder to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- Traditional web hosting

### Option 2: Full Stack Hosting (Frontend + Backend)
For contact form functionality, deploy both frontend and backend:

1. **Frontend**: Deploy `dist/` folder
2. **Backend**: Deploy entire project to a Node.js hosting service
3. **Environment Variables**: Set up your MongoDB connection and email credentials

## 📧 Contact Form Setup

The contact form requires:
1. MongoDB database connection
2. Email service configuration (Nodemailer)
3. Environment variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   EMAIL_USER=your_email@domain.com
   EMAIL_PASS=your_email_password
   ```

## Contact Form Setup with EmailJS

The contact form is configured to send emails directly to your Gmail account using EmailJS. Here's how to set it up:

1. Create a free account on [EmailJS](https://www.emailjs.com/)
2. Connect your Gmail account to EmailJS:
   - Go to "Email Services" in the EmailJS dashboard
   - Click "Add New Service"
   - Select "Gmail" and follow the authentication steps
   - Give your service a name (e.g., "cortexai-gmail")

3. Create an email template:
   - Go to "Email Templates" in the EmailJS dashboard
   - Click "Create New Template"
   - Design your template with variables like {{name}}, {{email}}, {{message}}, etc.
   - Save your template

4. Open `/src/pages/ContactPage.jsx` and replace the placeholders with your actual EmailJS values:

```jsx
await emailjs.sendForm(
  'YOUR_SERVICE_ID', // Replace with your EmailJS service ID (e.g., 'cortexai-gmail')
  'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
  formRef.current,
  'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
);
```

5. You can find these values in your EmailJS dashboard:
   - Service ID: In the "Email Services" section
   - Template ID: In the "Email Templates" section
   - Public Key: In the "Account" > "API Keys" section

## 🏗️ Built With

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Three.js
- **Backend**: Express.js, MongoDB, Nodemailer
- **Tools**: ESLint, PostCSS, Autoprefixer

## 📄 License

This project is proprietary and confidential. 