import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from '../api/axios';

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const calculateTotal = () => {
    const itemsPrice = cart?.totalPrice || 0;
    const shippingPrice = 50;
    const taxPrice = Math.round(itemsPrice * 0.18);
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    return { itemsPrice, shippingPrice, taxPrice, totalPrice };
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        calculateTotal();

      // 1️⃣ Create order in DB
      const orderData = {
        orderItems: cart.items.map((item) => ({
          product: item.product,
          name: item.name,
          image: item.image,
          price: item.price,
          size: item.size,
          color: item.color,
          qty: item.qty,
        })),
        shippingAddress,
        paymentMethod: 'Stripe',
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      };

      const orderRes = await axios.post('/orders', orderData);
      const createdOrder = orderRes.data.data;

      // 2️⃣ Create Stripe Checkout Session
      const stripeRes = await axios.post(
        '/stripe/create-checkout-session',
        {
          orderId: createdOrder._id,
        }
      );

      // 3️⃣ Redirect to Stripe Checkout
      window.location.href = stripeRes.data.url;
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.response?.data?.message || 'Checkout failed');
      setLoading(false);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate('/products')}
          className="bg-indigo-600 text-white px-6 py-3 rounded-md"
        >
          Shop Now
        </button>
      </div>
    );
  }

  const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    calculateTotal();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">Shipping Address</h2>

            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <input
                type="text"
                name="street"
                placeholder="Street Address"
                required
                value={shippingAddress.street}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  required
                  value={shippingAddress.city}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  required
                  value={shippingAddress.state}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  required
                  value={shippingAddress.pincode}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  value={shippingAddress.phone}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-md disabled:bg-gray-400"
              >
                {loading ? 'Redirecting…' : 'Proceed to Payment'}
              </button>
            </form>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-2 mb-4">
            {cart.items.map((item) => (
              <div key={item._id} className="flex justify-between text-sm">
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{itemsPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{shippingPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹{taxPrice}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
