const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// AI routes - we'll implement chatbot & recommendations later
router.post('/chatbot', protect, (req, res) => {
  res.json({ message: 'AI Chatbot - Coming soon' });
});

router.get('/recommendations', protect, (req, res) => {
  res.json({ message: 'AI Recommendations - Coming soon' });
});

module.exports = router;