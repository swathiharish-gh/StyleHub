import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState(0); // Track current image
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/products/${id}`);
      setProduct(data.data);
      
      // Set default selections
      if (data.data.sizes.length > 0) setSelectedSize(data.data.sizes[0]);
      if (data.data.colors.length > 0) setSelectedColor(data.data.colors[0]);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get images based on selected color or fallback to default
  const getCurrentImages = () => {
    if (!product) return [];
    
    // If images is an object (color-specific)
    if (typeof product.images === 'object' && !Array.isArray(product.images)) {
      return product.images[selectedColor] || product.images[product.colors[0]] || [];
    }
    
    // If images is an array (old format)
    return product.images || [];
  };

  const currentImages = getCurrentImages();

  // Reset selected image when color changes
  useEffect(() => {
    setSelectedImage(0);
  }, [selectedColor]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!selectedSize || !selectedColor) {
      setMessage('Please select size and color');
      return;
    }

    const result = await addToCart(product._id, selectedSize, selectedColor, qty);
    
    if (result.success) {
      setMessage('Added to cart successfully!');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage(result.message);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-center">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-center">Product not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="bg-gray-200 rounded-lg overflow-hidden mb-4">
            <img
              src={currentImages[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>
          {currentImages.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {currentImages.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`bg-gray-200 rounded-lg overflow-hidden cursor-pointer border-2 ${
                    selectedImage === index ? 'border-indigo-600' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-20 object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">
            {product.category} • {product.subcategory}
          </p>

          {product.ratings > 0 && (
            <div className="flex items-center mb-4">
              <span className="text-yellow-500 text-xl">★</span>
              <span className="text-lg ml-2">
                {product.ratings.toFixed(1)} ({product.numReviews} reviews)
              </span>
            </div>
          )}

          <div className="mb-6">
            <span className="text-3xl font-bold text-indigo-600">
              ₹{product.discountPrice || product.price}
            </span>
            {product.discountPrice && (
              <span className="text-xl text-gray-500 line-through ml-3">
                ₹{product.price}
              </span>
            )}
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Size</h3>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md ${
                    selectedSize === size
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                      : 'border-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Color</h3>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded-md ${
                    selectedColor === color
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                      : 'border-gray-300'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Quantity</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-3 py-1 border border-gray-300 rounded-md"
              >
                -
              </button>
              <span className="text-lg font-semibold">{qty}</span>
              <button
                onClick={() => setQty(Math.min(product.stock, qty + 1))}
                className="px-3 py-1 border border-gray-300 rounded-md"
              >
                +
              </button>
              <span className="text-sm text-gray-500 ml-2">
                ({product.stock} in stock)
              </span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>

          {message && (
            <div className={`mt-4 p-3 rounded-md ${
              message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}

          {/* Product Details */}
          <div className="mt-8 border-t pt-6">
            <h3 className="font-semibold mb-3">Product Details</h3>
            <ul className="space-y-2 text-gray-700">
              <li>Brand: {product.brand}</li>
              {product.material && <li>Material: {product.material}</li>}
              <li>Available Sizes: {product.sizes.join(', ')}</li>
              <li>Available Colors: {product.colors.join(', ')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;