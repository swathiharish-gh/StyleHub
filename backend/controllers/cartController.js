const asyncHandler = require("express-async-handler");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart) {
      // Create empty cart if doesn't exist
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to get cart",
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = asyncHandler(async (req, res, next) => {
  const { productId, size, color, qty } = req.body;

  // Validate input
  if (!productId || !size || !color || !qty) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // Check if product exists
  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Check stock availability
  if (product.stock < qty) {
    res.status(400);
    throw new Error("Insufficient stock");
  }

  // Find or create cart
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = new Cart({
      user: req.user._id,
      items: [],
    });
  }

  // Check if item already exists in cart
  const existingItemIndex = cart.items.findIndex(
    (item) =>
      item.product.toString() === productId &&
      item.size === size &&
      item.color === color
  );

  if (existingItemIndex > -1) {
    // Update quantity if item exists
    cart.items[existingItemIndex].qty += qty;
  } else {
    // -------------------------
    // SAFE IMAGE HANDLING LOGIC
    // -------------------------
    let imageUrl = "";

    // CASE 1: images is ARRAY → ["url1", "url2"]
    if (Array.isArray(product.images)) {
      imageUrl = product.images[0];
    }

    // CASE 2: images is OBJECT → { Black: ["url1"], White: ["url2"] }
    else if (
      typeof product.images === "object" &&
      product.images !== null &&
      product.images[color] &&
      product.images[color].length > 0
    ) {
      imageUrl = product.images[color][0];
    }

    // FALLBACK for object format if no color match
    if (!imageUrl && typeof product.images === "object") {
      const firstColor = Object.keys(product.images)[0];
      if (product.images[firstColor] && product.images[firstColor][0]) {
        imageUrl = product.images[firstColor][0];
      }
    }

    // FINAL FAIL SAFE
    if (!imageUrl) {
      res.status(400);
      throw new Error("Product does not have a valid image");
    }

    // ADD ITEM TO CART
    cart.items.push({
      product: productId,
      name: product.name,
      image: imageUrl,
      price: product.discountPrice || product.price,
      size,
      color,
      qty,
    });
  }

  await cart.save();

  res.status(201).json({
    success: true,
    data: cart,
  });
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/:itemId
// @access  Private
const updateCartItem = async (req, res) => {
  try {
    const { qty } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.id(req.params.itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    // Check stock
    const product = await Product.findById(item.product);
    if (product.stock < qty) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock",
      });
    }

    item.qty = qty;
    await cart.save();

    res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update cart item",
    });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Remove item using pull
    cart.items.pull(req.params.itemId);
    await cart.save();

    res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to remove item from cart",
    });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = [];
    await cart.save();

    res.json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to clear cart",
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
