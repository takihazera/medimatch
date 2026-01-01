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

module.exports = router;
