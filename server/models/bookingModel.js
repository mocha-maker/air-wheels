const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    startDate: {
      type: Date,
      required: [true, "Please select a start date"],
    },
    endDate: {
      type: Date,
      required: [true, "Please select an end date"],
    },
    days: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Object reference see database collection name
    },
    rental: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Rental", // Object reference see database collection name
    },
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model("Booking", bookingSchema);
