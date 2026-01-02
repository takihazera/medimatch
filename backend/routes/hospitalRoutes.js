const express = require('express');
const router = express.Router();
const {
  getHospitals,
  getHospitalById,
  addHospital,
  updateHospital,
  deleteHospital
} = require('../controllers/hospitalController');

// Public routes
router.get('/', getHospitals);
router.get('/:id', getHospitalById);


const adminAuth = require("../middleware/adminAuth");

// Admin routes
router.post('/', adminAuth, addHospital);
router.put('/:id', adminAuth, updateHospital);
router.delete('/:id', adminAuth, deleteHospital);



// Add review (public)
router.post("/:id/review", async (req, res) => {
  try {
    const Hospital = require("../models/Hospital");
    const hospital = await Hospital.findById(req.params.id);

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    hospital.reviews.push({
      comment: req.body.comment
    });

    await hospital.save();
    res.json({ message: "Review added" });
  } catch (err) {
    res.status(500).json({ message: "Error adding review" });
  }
});

module.exports = router;
