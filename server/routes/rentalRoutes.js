const express = require("express");
const Rental = require("../controllers/rentalController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router({ mergeParams: true });

// Rental Bookings
const bookingRoutes = require("./bookingRoutes");
router.use("/:rentalId/bookings", bookingRoutes);

router.route("/").post(protect, Rental.add).get(Rental.getAll);

router.route("/:rentalId").get(protect, Rental.getById);
// TODO: Update Rentals protected
//router.put("/:rentalId", protect, Rental.update);



module.exports = router;
