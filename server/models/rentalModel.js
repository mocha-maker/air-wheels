const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentalSchema = new Schema(
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
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rental", rentalSchema);
