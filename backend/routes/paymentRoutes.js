const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Payment routes - we'll implement Razorpay integration later
router.post('/razorpay/create-order', protect, (req, res) => {
  res.json({ message: 'Razorpay integration - Coming soon' });
});

router.post('/razorpay/verify', protect, (req, res) => {
  res.json({ message: 'Razorpay verification - Coming soon' });
});

module.exports = router;