import express from 'express';
import { submitContactForm, getContacts } from '../controllers/contactController.js';

const router = express.Router();

// POST /api/contact - Submit contact form
router.post('/', submitContactForm);

// GET /api/contact - Get all contacts (would be protected in production)
router.get('/', getContacts);

export default router; 