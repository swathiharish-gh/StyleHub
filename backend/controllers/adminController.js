const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');

// ============ PRODUCT MANAGEMENT ============

// @desc    Create a product
// @route   POST /api/admin/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: req.body.name || 'Sample Product',
    description: req.body.description || 'Sample description',
    price: req.body.price || 0,
    discountPrice: req.body.discountPrice || 0,
    images: req.body.images || ['https://via.placeholder.com/300'],
    category: req.body.category || 'Men',
    subcategory: req.body.subcategory || 'Casual',
    sizes: req.body.sizes || ['M', 'L', 'XL'],
    colors: req.body.colors || ['Black'],
    stock: req.body.stock || 0,
    brand: req.body.brand || 'StyleHub',
    material: req.body.material || '',
    tags: req.body.tags || []
  });

  const createdProduct = await product.save();

  res.status(201).json({
    success: true,
    data: createdProduct
  });
});

// @desc    Update a product
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.discountPrice = req.body.discountPrice || product.discountPrice;
    product.images = req.body.images || product.images;
    product.category = req.body.category || product.category;
    product.subcategory = req.body.subcategory || product.subcategory;
    product.sizes = req.body.sizes || product.sizes;
    product.colors = req.body.colors || product.colors;
    product.stock = req.body.stock !== undefined ? req.body.stock : product.stock;
    product.isBestseller = req.body.isBestseller !== undefined ? req.body.isBestseller : product.isBestseller;
    product.brand = req.body.brand || product.brand;
    product.material = req.body.material || product.material;
    product.tags = req.body.tags || product.tags;

    const updatedProduct = await product.save();

    res.json({
      success: true,
      data: updatedProduct
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Toggle bestseller status
// @route   PUT /api/admin/products/:id/bestseller
// @access  Private/Admin
const toggleBestseller = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.isBestseller = !product.isBestseller;
    await product.save();

    res.json({
      success: true,
      message: `Product ${product.isBestseller ? 'added to' : 'removed from'} bestsellers`,
      data: product
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// ============ ORDER MANAGEMENT ============

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate('user', 'name email')
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: orders
  });
});

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.orderStatus = req.body.status || order.orderStatus;

    if (req.body.status === 'Delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();

    res.json({
      success: true,
      data: updatedOrder
    });
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// ============ USER MANAGEMENT ============

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');

  res.json({
    success: true,
    data: users
  });
});

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error('Cannot delete admin user');
    }
    await user.deleteOne();
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Make user admin
// @route   PUT /api/admin/users/:id/admin
// @access  Private/Admin
const toggleAdminStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.isAdmin = !user.isAdmin;
    await user.save();

    res.json({
      success: true,
      message: `User ${user.isAdmin ? 'promoted to' : 'removed from'} admin`,
      data: user
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// ============ DASHBOARD STATS ============

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments({});
  const totalProducts = await Product.countDocuments({});
  const totalOrders = await Order.countDocuments({});
  
  const orders = await Order.find({});
  const totalRevenue = orders.reduce((acc, order) => {
    return order.isPaid ? acc + order.totalPrice : acc;
  }, 0);

  const pendingOrders = await Order.countDocuments({ orderStatus: 'Pending' });
  const deliveredOrders = await Order.countDocuments({ orderStatus: 'Delivered' });

  res.json({
    success: true,
    data: {
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      pendingOrders,
      deliveredOrders
    }
  });
});

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  toggleBestseller,
  getAllOrders,
  updateOrderStatus,
  getAllUsers,
  deleteUser,
  toggleAdminStatus,
  getDashboardStats
};