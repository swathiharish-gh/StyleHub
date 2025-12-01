const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

// All admin routes require authentication + admin status
router.use(protect, admin);

// Dashboard stats
router.get('/stats', getDashboardStats);

// Product management
router.route('/products')
  .post(createProduct);

router.route('/products/:id')
  .put(updateProduct)
  .delete(deleteProduct);

router.put('/products/:id/bestseller', toggleBestseller);

// Order management
router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);

// User management
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/admin', toggleAdminStatus);

module.exports = router;