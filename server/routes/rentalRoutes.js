const express = require("express");
const router = express.Router();
const Rental = require("../models/rentalModel");

// @desc Create a new rental
// @route POST /api/v1/
// @access Private
router.post("", async (req, res) => {
  const {
    title,
    city,
    country,
    category,
    battery,
    motor,
    range,
    speed,
    weight,
    dailyRate,
    image,
    description,
    createdAt,
  } = req.body;

  // Create a new rental
  const rental = await Rental.create({
    title,
    city,
    country,
    category,
    battery,
    motor,
    range,
    speed,
    weight,
    dailyRate,
    image,
    description,
    createdAt,
    // user: req.user,
  });

  // Return status and created rental
  res.status(201).json(rental);
});

// @desc Get all rentals
// @route GET /api/v1/rentals
// @access Public
router.get("", (req, res) => {
  // Get all rentals
  Rental.find({}, (err, foundRentals) => {
    res.json(foundRentals);
  });
});

// @desc Get rental by id
// @route GET /api/v1/rentals/:rentalId
// @access Public
router.get("/:rentalId", (req, res) => {
  const rentalId = req.params.rentalId;

  Rental.findById(rentalId, (err, foundRental) => {
    if (!foundRental) {
      res.status(422).send({
        errors: [
          {
            title: "Rental Error!",
            detail: "Could not find Rental Id: " + rentalId,
          },
        ],
      });
    }
    res.json(foundRental);
  });
});

module.exports = router;
