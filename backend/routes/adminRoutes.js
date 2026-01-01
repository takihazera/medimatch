// const router = require("express").Router();
// const Admin = require("../models/Admin");
// //sign up
// router.post("/sign-up", async (req, res) => {
//     try {
//         const { username, email, password } = req.body;
//         //check username is more than 3
//         if (username.length < 4) {
//             return res.status(400).json({ message: "Username's length should be greater than 3" });
//         }

//         //check username already exist
//         const existingUsername = await Admin.findOne({ username: username });
//         if (existingUsername) {
//             return res.status(400).json({ message: "Username already exists" });
//         }

//         //check email already exist
//         const existingEmail = await User.find({ email: email });
//         if (existingEmail) {
//             return res.status(400).json({ message: "Email already exists" });
//         }

//         //check password is more than 6
//         if (password.length < 6) {
//             return res.status(400).json({ message: "Password's length should be greater than 5" });
//         }

//         const newAdmin = new Admin({
//             username: username,
//             email: email,
//             password: password,
//         });
//         await newAdmin.save();
//         return res.status(200).json({ message: "SignUp Successsful" });


//     } catch (error) {
//         res.status(500).json({ message: "Internal server error" });
//     }
// });
// module.exports = router;

const express = require("express");
const { loginAdmin } = require("../controllers/adminController");
const { dashboardController } = require("../controllers/adminDashboardController");
const adminAuth = require("../middleware/adminAuth"); //new
const router = express.Router();

// const { loginAdmin } = require("../controllers/adminController");
// const { loginAdmin, dashboardController } = require("../controllers/adminController");

// router.get("/dashboard", adminAuth, dashboardController); //new

// router.post("/login", loginAdmin);
router.post("/login", loginAdmin);
router.get("/dashboard", adminAuth, dashboardController); //new


module.exports = router;


