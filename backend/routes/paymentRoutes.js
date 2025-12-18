const express = require('express');
const router = express.Router();
const { getStripeKey } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

// Get Stripe publishable key
router.get('/stripe/key', protect, getStripeKey);

module.exports = router;
