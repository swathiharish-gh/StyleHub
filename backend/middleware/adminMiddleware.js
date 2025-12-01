const asyncHandler = require('express-async-handler');

// Check if user is admin
const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as admin');
  }
});

module.exports = { admin };