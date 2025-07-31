import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars if .env file exists
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const config = {
  // Server configuration
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  
  // Database configuration
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/cortexai',
  
  // Email configuration
  EMAIL: {
    HOST: process.env.EMAIL_HOST || 'smtp.example.com',
    PORT: parseInt(process.env.EMAIL_PORT || '587'),
    USER: process.env.EMAIL_USER || 'user@example.com',
    PASS: process.env.EMAIL_PASS || 'password',
    FROM: process.env.EMAIL_FROM || 'noreply@cortexai.com',
    SECURE: process.env.EMAIL_SECURE === 'true',
    NOTIFICATION_EMAIL: process.env.NOTIFICATION_EMAIL || 'yash@cortexai.org.in'
  },
  email: {
    SMTP_HOST: process.env.SMTP_HOST || 'smtp.example.com',
    SMTP_PORT: process.env.SMTP_PORT || 587,
    SMTP_USER: process.env.SMTP_USER || 'user@example.com',
    SMTP_PASS: process.env.SMTP_PASS || 'password',
    NOTIFICATION_EMAIL: process.env.NOTIFICATION_EMAIL || 'yash@cortexai.org.in'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
  }
}; 