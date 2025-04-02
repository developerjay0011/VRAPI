const express = require('express');
const router = express.Router();
const Loan = require('../models/Loan');
const auth = require('../middleware/auth');

// Create new loan application
router.post('/', async (req, res) => {
  try {
    const loan = await Loan.create(req.body);
    res.status(201).json(loan);
  } catch (error) {
    console.error('Error creating loan application:', error);
    res.status(500).json({ message: 'Error creating loan application' });
  }
});

// Get all loan applications (protected route for admin)
router.get('/', auth, async (req, res) => {
  try {
    const loans = await Loan.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(loans);
  } catch (error) {
    console.error('Error fetching loans:', error);
    res.status(500).json({ message: 'Error fetching loans' });
  }
});

// Update loan status (protected route for admin)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const loan = await Loan.findByPk(id);
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    loan.status = status;
    await loan.save();

    res.json(loan);
  } catch (error) {
    console.error('Error updating loan status:', error);
    res.status(500).json({ message: 'Error updating loan status' });
  }
});

// Get loan application by ID (protected route for admin)
router.get('/:id', auth, async (req, res) => {
  try {
    const loan = await Loan.findByPk(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    res.json(loan);
  } catch (error) {
    console.error('Error fetching loan:', error);
    res.status(500).json({ message: 'Error fetching loan' });
  }
});

module.exports = router;
