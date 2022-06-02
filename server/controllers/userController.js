// User API Controller
const expressAsyncHandler = require("express-async-handler");
// Encryption module
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// User Model
const User = require("../models/userModel");

// @desc Register a new user
// @route /api/v1/users
// @access Public
exports.register = expressAsyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Validation
  if (!name || !email || !password || !confirmPassword) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // Check if user exists by email
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  // Create a new user
  const user = new User({
    name,
    email,
    password,
  });

  // Save to MongoDB and Generate server response
  user.save(async (err) => {
    if (err) {
      throw new Error(err);
    }
    // 201 Created
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  });
});

// @desc Login a  user
// @route /api/v1/users/auth
// @access Public
exports.auth = expressAsyncHandler(async (req, res) => {
  // Get email and password from request
  const { email, password } = req.body;

  // Check for complete input
  if (!password || !email) {
    res.status(400);
    throw new Error("Missing information", "");
  }

  // Check if user email exists in database
  const user = await User.findOne({ email });

  // Compare user & password entered with the one in the db
  if (user && user.isSamePassword(password)) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id, user.name),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

// @desc Retrieve user information
// @route /api/v1/users/me
// @access Private
exports.getMe = expressAsyncHandler(async (req, res) => {
  console.log("Retrieving Current User Data");
  // Deconstruct user model
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  };
  res.status(200).json(user);
});

// @desc Retrieve a user by id
// @route /api/v1/users/:userId
// @access Private
exports.getById = expressAsyncHandler(async (req, res) => {
  console.log("Retrieving User Data by Id");

  // Deconstruct user model
  const user = await User.findById(req.params.userId);
  console.log("User: " + req.user._id + " Requests user " + req.params.userId);

  // Check if user is the one logged in or is not an admin
  if (req.params.userId != req.user._id && !req.user.isAdmin) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  res.status(200).json(user);
});

// @desc Retrieve a user by email
// @route /api/v1/users/:userId
// @access Private
exports.getByEmail = expressAsyncHandler(async (req, res) => {
  console.log("Retrieving User Data by Email");

  const { email } = req.body;

  // Deconstruct user model
  const user = await User.findOne({ email });

  res.status(200).json(user);
});

// Generate a JSON token; Expires in 30days
const generateToken = (id, name) => {
  return jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
