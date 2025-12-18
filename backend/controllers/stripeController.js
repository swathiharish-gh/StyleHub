// backend/controllers/stripeController.js
const asyncHandler = require('express-async-handler');
const Stripe = require('stripe');
require('dotenv').config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

// @desc Create Stripe Checkout Session
// @route POST /api/stripe/create-checkout-session
// @access Private
const createCheckoutSession = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  const order = await Order.findById(orderId);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  if (order.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized');
  }

  // Map items for Stripe
  const line_items = order.orderItems.map(item => ({
    price_data: {
      currency: 'inr',
      product_data: { name: item.name },
      unit_amount: Math.round(item.price * 100), // in paise
    },
    quantity: item.qty,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}&orderId=${order._id}`,
    cancel_url: `${process.env.FRONTEND_URL}/checkout`,
    metadata: { orderId: order._id.toString() },
  });

  res.json({ url: session.url });
});

// @desc Verify Stripe Checkout Session
// @route POST /api/stripe/verify-session
// @access Private
const verifyCheckoutSession = asyncHandler(async (req, res) => {
  const { sessionId, orderId } = req.body;

  if (!sessionId || !orderId) {
    res.status(400);
    throw new Error('Missing session or order ID');
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== 'paid') {
    res.status(400);
    throw new Error('Payment not completed');
  }

  const order = await Order.findById(orderId);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Mark order as paid
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: session.payment_intent,
    status: session.payment_status,
    email: session.customer_details?.email,
  };

  await order.save();

  res.json({ success: true });
});

module.exports = {
  createCheckoutSession,
  verifyCheckoutSession,
};
