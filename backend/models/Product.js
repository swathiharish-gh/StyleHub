const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    name: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please add a description']
    },

    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: 0
    },
    discountPrice: {
      type: Number,
      default: 0,
      min: 0
    },

    // supports both: ["url1"] OR { Black: ["url1"] }
    images: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },

    category: {
      type: String,
      required: true,
      enum: ['Men', 'Women', 'Kids']
    },

    // FIXED: matches your real data
    subcategory: {
      type: String,
      required: true,
      enum: ['Casual', 'Formal', 'Traditional', 'Sportswear']
    },

    // FIXED: removed enum (kids, free-size, numeric sizes, etc.)
    sizes: [
      {
        type: String
      }
    ],

    colors: [
      {
        type: String
      }
    ],

    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    },

    isBestseller: {
      type: Boolean,
      default: false
    },

    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },

    numReviews: {
      type: Number,
      default: 0
    },

    reviews: [reviewSchema],

    brand: {
      type: String,
      default: 'StyleHub'
    },

    material: {
      type: String,
      default: ''
    },

    tags: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true
  }
);

// indexes for search & filtering
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ price: 1 });

module.exports = mongoose.model('Product', productSchema);
