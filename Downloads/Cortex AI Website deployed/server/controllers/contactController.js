import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';
import { config } from '../config/config.js';

// In-memory store for contact submissions when MongoDB is not available
const inMemoryContacts = [];

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, company, phone, message, service } = req.body;

    // Try to create in MongoDB first
    try {
      const contact = await Contact.create({
        name,
        email,
        company,
        phone,
        message,
        service
      });

      // Send email notification
      await sendEmailNotification(contact);

      res.status(201).json({
        success: true,
        data: contact,
        message: 'Your message has been received. We will contact you shortly.'
      });
    } catch (dbError) {
      // Fall back to in-memory storage if MongoDB is unavailable
      console.log('Using in-memory storage for contact submission');
      
      const contact = {
        _id: `mem_${Date.now()}`,
        name,
        email,
        company,
        phone,
        message,
        service,
        status: 'new',
        createdAt: new Date()
      };
      
      inMemoryContacts.push(contact);
      
      // Send email notification
      await sendEmailNotification(contact);
      
      res.status(201).json({
        success: true,
        data: contact,
        message: 'Your message has been received. We will contact you shortly. (In-memory mode)'
      });
    }
  } catch (error) {
    console.error('Contact form submission error:', error);
    
    // Check for validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error. Please try again later.'
    });
  }
};

// Helper function to send email notification
const sendEmailNotification = async (contact) => {
  // Create transporter using config values
  const transporter = nodemailer.createTransport({
    host: config.EMAIL.HOST,
    port: config.EMAIL.PORT,
    secure: config.EMAIL.SECURE,
    auth: {
      user: config.EMAIL.USER,
      pass: config.EMAIL.PASS
    }
  });

  // Prepare email content
  const mailOptions = {
    from: config.EMAIL.FROM,
    to: config.EMAIL.NOTIFICATION_EMAIL,
    subject: `New Contact Form Submission: ${contact.service}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Company:</strong> ${contact.company || 'Not provided'}</p>
      <p><strong>Phone:</strong> ${contact.phone || 'Not provided'}</p>
      <p><strong>Service:</strong> ${contact.service}</p>
      <h3>Message:</h3>
      <p>${contact.message}</p>
      <p><small>Submitted on: ${new Date(contact.createdAt).toLocaleString()}</small></p>
    `
  };

  // Only attempt to send in production environment
  if (config.NODE_ENV === 'production') {
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email notification sent for contact: ${contact._id}`);
    } catch (error) {
      console.error('Email notification error:', error);
    }
  } else {
    console.log('Email notification would be sent in production');
    console.log(mailOptions);
  }
};

// @desc    Get all contact submissions (for admin panel)
// @route   GET /api/contact
// @access  Private (would need auth middleware)
export const getContacts = async (req, res) => {
  try {
    try {
      // Try to get from MongoDB first
      const contacts = await Contact.find().sort({ createdAt: -1 });
      
      res.status(200).json({
        success: true,
        count: contacts.length,
        data: contacts
      });
    } catch (dbError) {
      // Fall back to in-memory storage
      console.log('Using in-memory storage for contacts');
      
      res.status(200).json({
        success: true,
        count: inMemoryContacts.length,
        data: inMemoryContacts
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error. Please try again later.'
    });
  }
}; 