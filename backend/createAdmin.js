const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("./models/Admin");

dotenv.config();

console.log("Connecting to MongoDB...");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    const existing = await Admin.findOne({ email: "admin@test.com" });
    if (existing) {
      console.log("Admin already exists");
      process.exit();
    }

    const admin = await Admin.create({
      username: "admin",
      email: "admin@test.com",
      password: "123456",
    });

    console.log("Admin created:", admin.email);
    process.exit();
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });
