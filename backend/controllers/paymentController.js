require('dotenv').config(); // MUST BE FIRST

const asyncHandler = require('express-async-handler');
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

console.log('STRIPE SECRET KEY:', process.env.STRIPE_SECRET_KEY);

// @desc    Create Stripe payment intent
// @route   POST /api/payment/stripe/create-payment-intent
// @access  Private
const createStripePaymentIntent = asyncHandler(async (req, res) => {
  const { orderId, amount } = req.body;

  // Verify order exists and belongs to user
  const order = await Order.findById(orderId);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  if (order.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to access this order');
  }

  if (order.isPaid) {
    res.status(400);
    throw new Error('Order is already paid');
  }

  try {
    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'inr',
      metadata: {
        orderId: orderId,
        userId: req.user._id.toString(),
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      },
    });
  } catch (error) {
    console.error('Stripe payment intent error:', error);
    res.status(500);
    throw new Error('Failed to create payment intent');
  }
});

// @desc    Get Stripe publishable key
// @route   GET /api/payment/stripe/key
// @access  Public
const getStripeKey = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    key: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

module.exports = {
  createStripePaymentIntent,
  getStripeKey,
};