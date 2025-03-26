const express = require('express');
const Inquiry = require('../models/Inquiry');
const auth = require('../middleware/auth');

const router = express.Router();

// Create new inquiry
router.post('/', async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);
    res.status(201).json(inquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all inquiries (protected route)
router.get('/', auth, async (req, res) => {
  try {
    const inquiries = await Inquiry.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update inquiry status (protected route)
router.patch('/:id', auth, async (req, res) => {
  try {
    const [updated] = await Inquiry.update(
      { status: req.body.status },
      { where: { id: req.params.id } }
    );
    if (updated === 0) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    const inquiry = await Inquiry.findByPk(req.params.id);
    res.json(inquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete inquiry (protected route)
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Inquiry.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
