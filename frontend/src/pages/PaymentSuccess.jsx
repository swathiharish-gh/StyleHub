import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from '../api/axios';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const orderId = searchParams.get('orderId');
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!orderId || !sessionId) {
        setError('Invalid payment session');
        setLoading(false);
        return;
      }

      try {
        await axios.post('/stripe/verify-session', {
          orderId,
          sessionId,
        });

        setLoading(false);
      } catch (err) {
        console.error('Payment verification error:', err);
        setError(
          err.response?.data?.message || 'Payment verification failed'
        );
        setLoading(false);
      }
    };

    verifyPayment();
  }, [orderId, sessionId]);

  // ⏳ Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-medium">
          Confirming your payment…
        </p>
      </div>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Payment Failed
          </h2>
          <p className="mb-4 text-gray-700">{error}</p>
          <Link
            to="/orders"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md"
          >
            View Orders
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Success
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md">
        <h2 className="text-3xl font-bold text-green-600 mb-2">
          Payment Successful
        </h2>
        <p className="mb-6 text-gray-700">
          Your order has been placed successfully.
        </p>
        <Link
          to="/orders"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md"
        >
          View My Orders
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
