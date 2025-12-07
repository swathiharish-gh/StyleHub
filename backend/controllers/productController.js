const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// @desc    Get all products with filters
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.limit) || 12;
  const page = Number(req.query.page) || 1;

  // Build query object based on filters
  const query = {};

  // Category filter
  if (req.query.category) {
    query.category = req.query.category;
  }

  // Subcategory filter
  if (req.query.subcategory) {
    query.subcategory = req.query.subcategory;
  }

  // Size filter
  if (req.query.size) {
    query.sizes = { $in: [req.query.size] };
  }

  // Color filter
  if (req.query.color) {
    query.colors = { $in: [req.query.color] };
  }

  // Price range filter
  if (req.query.minPrice || req.query.maxPrice) {
    query.price = {};
    if (req.query.minPrice) {
      query.price.$gte = Number(req.query.minPrice);
    }
    if (req.query.maxPrice) {
      query.price.$lte = Number(req.query.maxPrice);
    }
  }

  // Bestseller filter
  if (req.query.bestseller === 'true') {
    query.isBestseller = true;
  }

  // Search keyword (searches in name, description, tags)
  if (req.query.keyword) {
    // Use regex for partial matching (more flexible than $text)
    const keyword = req.query.keyword;
    query.$or = [
      { name: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } },
      { tags: { $regex: keyword, $options: 'i' } },
      { brand: { $regex: keyword, $options: 'i' } },
      { category: { $regex: keyword, $options: 'i' } },
      { subcategory: { $regex: keyword, $options: 'i' } }
    ];
  }

  // Count total products matching query
  const count = await Product.countDocuments(query);

  // Get products with pagination
  let products = await Product.find(query)
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 }); // Newest first

  // Sort by price if requested
  if (req.query.sort === 'price-asc') {
    products = await Product.find(query)
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ price: 1 });
  } else if (req.query.sort === 'price-desc') {
    products = await Product.find(query)
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ price: -1 });
  } else if (req.query.sort === 'rating') {
    products = await Product.find(query)
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ ratings: -1 });
  }

  res.json({
    success: true,
    data: products,
    page,
    pages: Math.ceil(count / pageSize),
    total: count
  });
});

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('reviews.user', 'name');

  if (product) {
    // Add to user's browsing history if logged in
    if (req.user) {
      const User = require('../models/User');
      await User.findByIdAndUpdate(req.user._id, {
        $addToSet: { browsingHistory: product._id }
      });
    }

    res.json({
      success: true,
      data: product
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get bestseller products
// @route   GET /api/products/bestsellers
// @access  Public
const getBestsellers = asyncHandler(async (req, res) => {
  const products = await Product.find({ isBestseller: true }).limit(8);

  res.json({
    success: true,
    data: products
  });
});

// @desc    Get featured/new arrival products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    .sort({ createdAt: -1 })
    .limit(8);

  res.json({
    success: true,
    data: products
  });
});

// @desc    Create product review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    // Check if user already reviewed
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('You have already reviewed this product');
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    // Calculate average rating
    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Review added successfully'
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get related products (same category/subcategory)
// @route   GET /api/products/:id/related
// @access  Public
const getRelatedProducts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    const relatedProducts = await Product.find({
      category: product.category,
      subcategory: product.subcategory,
      _id: { $ne: product._id } // Exclude current product
    }).limit(4);

    res.json({
      success: true,
      data: relatedProducts
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = {
  getProducts,
  getProductById,
  getBestsellers,
  getFeaturedProducts,
  createProductReview,
  getRelatedProducts
};