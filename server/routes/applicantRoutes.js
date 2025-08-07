import express from 'express';
import Applicant from '../models/Applicant.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to verify admin token
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Create new applicant registration
router.post('/', async (req, res) => {
  const { name, email, phone, role, message } = req.body;
  
  // Validate required fields
  if (!name || !email || !phone || !role) {
    return res.status(400).json({ 
      msg: 'Please fill in all required fields (name, email, phone, role)' 
    });
  }

  // Validate role
  if (!['Intern', 'Volunteer'].includes(role)) {
    return res.status(400).json({ 
      msg: 'Role must be either "Intern" or "Volunteer"' 
    });
  }

  try {
    // Check if email already exists
    const existingApplicant = await Applicant.findOne({ email: email.toLowerCase() });
    if (existingApplicant) {
      return res.status(400).json({ 
        msg: 'An application with this email already exists' 
      });
    }

    const newApplicant = new Applicant({ 
      name: name.trim(), 
      email: email.toLowerCase().trim(), 
      phone: phone.trim(), 
      role,
      message: message?.trim() || ''
    });
    
    await newApplicant.save();
    res.status(201).json({ 
      msg: 'Application submitted successfully!',
      applicant: {
        id: newApplicant._id,
        name: newApplicant.name,
        email: newApplicant.email,
        role: newApplicant.role
      }
    });
  } catch (err) {
    console.error('Error creating applicant:', err);
    res.status(500).json({ msg: 'Server error. Please try again later.' });
  }
});

// Get all applicants (admin only)
router.get('/', verifyAdmin, async (req, res) => {
  try {
    const applicants = await Applicant.find()
      .sort({ createdAt: -1 }) // Most recent first
      .select('-__v'); // Exclude version field
    res.json(applicants);
  } catch (err) {
    console.error('Error fetching applicants:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get applicant by ID (admin only)
router.get('/:id', verifyAdmin, async (req, res) => {
  try {
    const applicant = await Applicant.findById(req.params.id).select('-__v');
    if (!applicant) {
      return res.status(404).json({ msg: 'Applicant not found' });
    }
    res.json(applicant);
  } catch (err) {
    console.error('Error fetching applicant:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete applicant by ID (admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const applicant = await Applicant.findByIdAndDelete(req.params.id);
    if (!applicant) {
      return res.status(404).json({ msg: 'Applicant not found' });
    }
    res.json({ msg: 'Applicant deleted successfully' });
  } catch (err) {
    console.error('Error deleting applicant:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;