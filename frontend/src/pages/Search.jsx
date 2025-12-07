import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from '../api/axios';

const Search = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('q') || '';
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (keyword) {
      searchProducts();
    }
  }, [keyword]);

  const searchProducts = async () => {
    try {
      setLoading(true);
      setNotFound(false);
      const { data } = await axios.get(`/products?keyword=${keyword}`);
      setProducts(data.data);
      
      if (data.data.length === 0) {
        setNotFound(true);
      }
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!keyword) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Search Products</h2>
        <p className="text-gray-600">Enter a keyword to search for products</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-gray-600">
          Showing results for: <span className="font-semibold text-indigo-600">"{keyword}"</span>
        </p>
        {!loading && (
          <p className="text-sm text-gray-500 mt-1">
            {products.length} {products.length === 1 ? 'product' : 'products'} found
          </p>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Searching...</p>
        </div>
      )}

      {/* No Results */}
      {notFound && !loading && (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-24 w-24 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h3 className="mt-4 text-xl font-semibold text-gray-900">No products found</h3>
          <p className="mt-2 text-gray-600">
            Try searching with different keywords or{' '}
            <Link to="/products" className="text-indigo-600 hover:text-indigo-700">
              browse all products
            </Link>
          </p>
          
          {/* Suggestions */}
          <div className="mt-8">
            <p className="text-sm text-gray-500 mb-4">Try these suggestions:</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link
                to="/products?category=Men"
                className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
              >
                Men's Wear
              </Link>
              <Link
                to="/products?category=Women"
                className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
              >
                Women's Wear
              </Link>
              <Link
                to="/products?category=Kids"
                className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
              >
                Kids' Wear
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Results Grid */}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product._id}
              to={`/products/${product._id}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                <div className="h-64 bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img
                    src={
                      Array.isArray(product.images)
                        ? product.images[0]
                        : product.images[Object.keys(product.images)[0]][0]
                    }
                    alt={product.name}
                    className="h-full w-full object-cover group-hover:scale-110 transition"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 truncate">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {product.category} • {product.subcategory}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-indigo-600 font-bold text-lg">
                      ₹{product.discountPrice || product.price}
                    </span>
                    {product.discountPrice && (
                      <span className="text-gray-500 line-through text-sm">
                        ₹{product.price}
                      </span>
                    )}
                  </div>
                  {product.ratings > 0 && (
                    <div className="flex items-center mt-2">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm text-gray-600 ml-1">
                        {product.ratings.toFixed(1)} ({product.numReviews})
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;