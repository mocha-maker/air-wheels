// Connect to MongoDB
const mongoose = require("mongoose");
const FakeDb = require("../fake-db");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // SEED DB
    mongoose.connect(process.env.MONGO_URI).then(() => {
      const fakeDB = new FakeDb();
      fakeDB.seedDB();
    });

    console.log(`MongoDB Connection: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
