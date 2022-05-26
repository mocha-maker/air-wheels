const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      max: [128, "Too long, max is 128 characters"],
    },
    city: { type: String, required: true },
    country: { type: String, required: true },
    category: { type: String, required: true },
    battery: { type: String, default: "No battery provided" },
    motor: { type: String, default: "No motor provided" },
    range: { type: String, default: "No range provided" },
    wheelDiameter: { type: String, required: true },
    speed: { type: Number, default: 0 },
    weight: { type: Number, default: 0 },
    dailyRate: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, default: "No description provided." },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rental", rentalSchema);
