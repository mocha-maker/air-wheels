const express = require("express");
const router = express.Router();
const User = require("../controllers/userController");
const Booking = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");

// Body: name, email, password
router.post("/register", User.register);

// Login and Authorize user
router.post("/auth", User.auth);

router.get("/me", protect, User.getMe);
router.get("/:userId", protect, User.getById);
router.get("", User.getByEmail);

router.get("/:userId/bookings", protect, Booking.getAllByUser);

module.exports = router;
