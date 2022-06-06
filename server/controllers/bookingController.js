// User API Controller
const expressAsyncHandler = require("express-async-handler");
const Booking = require("../models/bookingModel");
const Rental = require("../models/rentalModel");
const moment = require("moment");
const User = require("../models/userModel");
const { findByIdAndDelete } = require("../models/rentalModel");

// @desc Create a new booking
// @route POST /api/v1/rentals/:rentalId/bookings
// @access Private
exports.add = expressAsyncHandler(async (req, res) => {
  const { startDate, endDate } = req.body;

  // get rental object
  const rental = await Rental.findById(req.params.rentalId);

  if (!rental) {
    res.status(404);
    throw new Error("Rental not found");
  }

  // get user object from auth request
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  debugger;
  // check if user owns the rental

  if (rental.user._id.equals(user._id)) {
    res.status(401);
    throw new Error("You cannot make a booking on your own rental");
  }
  // Calculate days
  const days = moment(endDate).diff(startDate, "days") + 1;

  // Calculate total price
  const totalPrice = rental.dailyRate * days;

  // Create a new booking
  const booking = await Booking.create({
    startDate: moment.utc(startDate).format("LLL"),
    endDate: moment.utc(endDate).format("LLL"),
    days,
    totalPrice,
    user,
    rental,
  });

  // check if booking dates are valid for rental
  const isValid = await isValidBooking(booking, rental);
  console.log("Validation result:" + isValid.value);

  if (!isValid.value) {
    console.log("Deleting Invalid Booking");
    await Booking.deleteOne({ _id: booking._id });
    res.status(400);
    throw new Error(isValid.error);
  }

  console.log("Saving booking to rentals and users");
  // add booking to rental and user
  user.bookings.push(booking._id);
  user.save();
  rental.bookings.push(booking._id);
  rental.save();
  // Return status and created rental
  res.status(201).json(booking);
});

// @desc Get all bookings
// @route GET /api/v1/bookings
// @access Private
exports.getAll = expressAsyncHandler(async (req, res) => {
  const bookings = await Booking.find();

  if (!bookings) {
    res.status(404);
    throw new Error("No bookings found");
  }

  res.status(200).json(bookings);
});

// @desc Get a booking by id
// @route GET /api/v1/bookings/:bookingId
// @access Private
exports.getById = expressAsyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.bookingId);

  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  res.status(200).json(booking);
});

// @desc Get all bookings by Rental
// @route GET /api/v1/rental/:rentalId/bookings
// @access Private
exports.getAllByRental = expressAsyncHandler(async (req, res) => {
  const bookings = await Booking.find({ rental: req.params.rentalId });

  if (!bookings) {
    res.status(404);
    throw new Error("No bookings found");
  }

  res.status(200).json(bookings);
});

// @desc Get one booking by id
// @route GET /api/v1/rental/:rentalId/bookings/:bookingId
// @access Private
exports.getById = expressAsyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.bookingId)
    .populate("user", "name -_id")
    .populate("rental", "title -_id");

  if (!booking) {
    res.status(404);
    throw new Error("No booking found");
  }

  res.status(200).json(booking);
});

// @desc Get all bookings by User
// @route GET /api/v1/user/:userId/bookings
// @access Private
exports.getAllByUser = expressAsyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.params.userId });

  if (!bookings) {
    res.status(404);
    throw new Error("No bookings found");
  }

  res.status(200).json(bookings);
});

// @desc Delete a booking by id
// @route DELETE /api/v1/bookings/:bookingId
// @access Private
exports.deleteById = expressAsyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.bookingId);
  // get user object from auth request
  const user = await User.findById(booking.user._id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // check if user is the same as booking
  if (!user._id.equals(req.user.id)) {
    res.status(400);
    throw new Error("Unauthorized User");
  }
  // Check if it exists first
  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  // TODO: Change to Model.update function instead of getting the full obj
  const rental = await Rental.findById(booking.rental._id);

  if (!rental) {
    res.status(404);
    throw new Error("Rental not found");
  }

  // Delete Booking
  await Booking.findByIdAndDelete(req.params.bookingId);
  // Delete Booking from user and rental
  user.bookings.pull({ _id: req.params.bookingId });
  user.save();
  rental.bookings.pull({ _id: req.params.bookingId });
  rental.save();

  res.status(200).json("Deleted Booking");
});

//
//
// Booking Validation for no overlapping bookings in the rental
async function isValidBooking(proposedBooking, rental) {
  const rentalBookings = await Booking.find({ rental: rental._id });

  return new Promise((res, rej) => {
    console.log(
      "Proposed Dates: " +
        moment(proposedBooking.startDate).format("LLL") +
        " to " +
        moment(proposedBooking.endDate).format("LLL")
    );
    // Check if Proposed Dates are in order
    if (
      moment(proposedBooking.startDate).isSameOrAfter(proposedBooking.endDate)
    )
      return res({ value: false, error: "Dates not in order" });

    // Check if rental has bookings
    console.log(rental.bookings.length);
    if (rental.bookings.length <= 0) {
      console.log("No bookings exists on rental.");
      return res({ value: true });
    }

    console.log("Checking rental bookings for overlap");
    const allValid = rentalBookings.every((booking) => {
      // catch if checking the same booking
      if (proposedBooking._id.equals(booking._id)) return true;

      // Return true if neither proposed dates are between existing booking dates
      return (
        !moment(proposedBooking.startDate).isBetween(
          booking.startDate,
          booking.endDate,
          undefined,
          "[]"
        ) &&
        !moment(proposedBooking.endDate).isBetween(
          booking.startDate,
          booking.endDate,
          undefined,
          "[]"
        )
      );
    });

    console.log("IsAllValid: " + allValid);

    if (!allValid) {
      return res({
        value: false,
        error: "Overlapping dates exist",
      });
    } else {
      return res({ value: true });
    }
  });
}
