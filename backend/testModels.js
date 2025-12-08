const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
const Hospital = require('./models/Hospital');
const Test = require('./models/Test');
const Review = require('./models/Review');

connectDB();

const runTest = async () => {
  try {
    // Create hospital
    const hospital = await Hospital.create({
      name: "Medicare Hospital",
      address: "Dhaka, Bangladesh",
      rating: 4.5,
      tests: [
        { testName: "CBC", price: 500 },
        { testName: "X-Ray", price: 800 },
      ],
    });
    console.log("Hospital created:", hospital);

    // Create test
    const test = await Test.create({
      testName: "CBC",
      description: "Complete Blood Count",
      commonPriceRange: "400-600",
    });
    console.log("Test created:", test);

    // Create review
    const review = await Review.create({
      hospital: hospital._id,
      rating: 5,
      comment: "Excellent service",
      user: "Taki",
    });
    console.log("Review created:", review);

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

runTest();
