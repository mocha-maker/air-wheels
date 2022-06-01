// Authorization Middleware
const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const req = require("express/lib/request");

// Protect routes
const protect = expressAsyncHandler(async (req, res, next) => {
  // Initialize token
  let token;

  // Check if a token exists in the headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header without 'Bearer'
      token = req.headers.authorization.split(" ")[1];

      // Verify token using secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get User from token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }
});

module.exports = { protect };
