import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const [featuredRes, bestsellerRes] = await Promise.all([
        axios.get('/products/featured'),
        axios.get('/products/bestsellers'),
      ]);

      setFeaturedProducts(featuredRes.data.data);
      setBestsellers(bestsellerRes.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to StyleHub</h1>
          <p className="text-xl mb-8">
            Discover the latest trends in fashion for Men, Women & Kids
          </p>
          <Link
            to="/products"
            className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link
            to="/products?category=Men"
            className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition"
          >
            <div className="h-64 bg-blue-200 flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-700">Men's Wear</span>
            </div>
          </Link>

          <Link
            to="/products?category=Women"
            className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition"
          >
            <div className="h-64 bg-pink-200 flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-700">Women's Wear</span>
            </div>
          </Link>

          <Link
            to="/products?category=Kids"
            className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition"
          >
            <div className="h-64 bg-green-200 flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-700">Kids' Wear</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Bestsellers Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Bestsellers</h2>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {bestsellers.slice(0, 4).map((product) => (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                  <div className="h-64 bg-gray-200 flex items-center justify-center">
                    <img
                      src={Array.isArray(product.images) ? product.images[0] : product.images[Object.keys(product.images)[0]][0]}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-indigo-600 font-bold">
                        ₹{product.discountPrice || product.price}
                      </span>
                      {product.discountPrice && (
                        <span className="text-gray-500 line-through text-sm">
                          ₹{product.price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* New Arrivals Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">New Arrivals</h2>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 4).map((product) => (
                <Link
                  key={product._id}
                  to={`/products/${product._id}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                    <div className="h-64 bg-gray-200 flex items-center justify-center">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-indigo-600 font-bold">
                          ₹{product.discountPrice || product.price}
                        </span>
                        {product.discountPrice && (
                          <span className="text-gray-500 line-through text-sm">
                            ₹{product.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;