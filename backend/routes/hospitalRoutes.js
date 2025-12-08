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

// Admin routes
router.post('/', addHospital);
router.put('/:id', updateHospital);
router.delete('/:id', deleteHospital);

module.exports = router;
