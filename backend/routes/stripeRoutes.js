// backend/routes/stripeRoutes.js
const express = require('express');
const router = express.Router();
const { createCheckoutSession, verifyCheckoutSession } = require('../controllers/stripeController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create-checkout-session', protect, createCheckoutSession);
router.post('/verify-session', protect, verifyCheckoutSession);


module.exports = router;
