const express = require("express");
const Rental = require("../controllers/rentalController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("", protect, Rental.add);

// TODO: Update Rentals protected
//router.put("/:rentalId", protect, Rental.update);

router.get("", Rental.getAll);
router.get("/:rentalId", Rental.getById);

module.exports = router;
