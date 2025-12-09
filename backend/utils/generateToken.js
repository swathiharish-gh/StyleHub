const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
  console.log("SIGNING TOKEN WITH SECRET:", process.env.JWT_SECRET);

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d' // Token expires in 30 days
  });
};

module.exports = generateToken;
