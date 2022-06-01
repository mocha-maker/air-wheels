// import modules
const express = require("express");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");

// Server Components
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const rentalRoutes = require("./routes/rentalRoutes");
const userRoutes = require("./routes/userRoutes");

// run express
const app = express();

// initialize PORT variable for listener
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Set response data encoding
app.use(express.json()); // Accept data in json
app.use(express.urlencoded({ extended: false }));

// Routes
const apiVersion = "/api/v1";
app.use(apiVersion + "/rentals", rentalRoutes);
app.use(apiVersion + "/users", userRoutes);

// Server Frontend - check if in production
if (process.env.NODE_ENV === "production") {
  // set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(__dirname, "../", "frontend", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.status(200).json({
      message: "Welcome to the EUC Rental App!",
    });
  });
}

// Error handler
app.use(errorHandler);

// make app listen to the port for HTTP requests
app.listen(PORT, () => {
  console.log(`Server Started on PORT: ${PORT}`.green.bold);
});
