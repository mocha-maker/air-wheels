const express = require("express");
const Booking = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");
const router0 = express.Router();
const router = express.Router({ mergeParams: true });

// Route address: "/api/rentals/:rentalId/bookings/"

router
  .route("/")
  .post(protect, Booking.add)
  .get(protect, Booking.getAllByRental);

router
  .route("/:bookingId/")
  .get(protect, Booking.getById)
  .delete(protect, Booking.deleteById);

module.exports = router;
