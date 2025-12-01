const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  getBestsellers,
  getFeaturedProducts,
  createProductReview,
  getRelatedProducts
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getProducts);
router.get('/bestsellers', getBestsellers);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProductById);
router.get('/:id/related', getRelatedProducts);

// Protected routes
router.post('/:id/reviews', protect, createProductReview);

module.exports = router;