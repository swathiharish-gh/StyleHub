import React from 'react';
import { useParams } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Product</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">Edit product form - Coming soon!</p>
        <p className="text-sm text-gray-500 mt-2">Product ID: {id}</p>
      </div>
    </div>
  );
};

export default EditProduct;