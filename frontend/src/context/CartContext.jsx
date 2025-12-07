import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/cart');
      setCart(data.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, size, color, qty = 1) => {
    try {
      const { data } = await axios.post('/cart', {
        productId,
        size,
        color,
        qty,
      });
      setCart(data.data);
      return { success: true, message: 'Added to cart' };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to add to cart',
      };
    }
  };

  const updateCartItem = async (itemId, qty) => {
    try {
      const { data } = await axios.put(`/cart/${itemId}`, { qty });
      setCart(data.data);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update cart',
      };
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const { data } = await axios.delete(`/cart/${itemId}`);
      setCart(data.data);
      return { success: true, message: 'Removed from cart' };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to remove item',
      };
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete('/cart');
      setCart({ items: [], totalPrice: 0 });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to clear cart',
      };
    }
  };

  const getCartCount = () => {
    return cart?.items?.reduce((total, item) => total + item.qty, 0) || 0;
  };

  const value = {
    cart,
    loading,
    fetchCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
