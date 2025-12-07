import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, loading, updateCartItem, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-center">Loading cart...</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-6">Add some products to get started!</p>
        <Link
          to="/products"
          className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  const handleUpdateQty = async (itemId, newQty) => {
    if (newQty < 1) return;
    await updateCartItem(itemId, newQty);
  };

  const handleRemoveItem = async (itemId) => {
    if (window.confirm('Remove this item from cart?')) {
      await removeFromCart(itemId);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md p-4 flex gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md"
              />

              <div className="flex-1">
                <Link
                  to={`/products/${item.product}`}
                  className="text-lg font-semibold hover:text-indigo-600"
                >
                  {item.name}
                </Link>
                <p className="text-gray-600 text-sm mt-1">
                  Size: {item.size} | Color: {item.color}
                </p>
                <p className="text-indigo-600 font-bold mt-2">₹{item.price}</p>

                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateQty(item._id, item.qty - 1)}
                      className="px-2 py-1 border border-gray-300 rounded-md"
                    >
                      -
                    </button>
                    <span className="font-semibold">{item.qty}</span>
                    <button
                      onClick={() => handleUpdateQty(item._id, item.qty + 1)}
                      className="px-2 py-1 border border-gray-300 rounded-md"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold">₹{item.price * item.qty}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">₹{cart.totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold">₹50</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (GST 18%)</span>
                <span className="font-semibold">
                  ₹{Math.round(cart.totalPrice * 0.18)}
                </span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-indigo-600">
                  ₹{cart.totalPrice + 50 + Math.round(cart.totalPrice * 0.18)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition"
            >
              Proceed to Checkout
            </button>

            <Link
              to="/products"
              className="block text-center text-indigo-600 mt-4 hover:text-indigo-700"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;