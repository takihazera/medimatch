const Hospital = require('../models/Hospital');

// @desc Get all hospitals for a test
// @route GET /api/hospitals?test=<testName>
const getHospitals = async (req, res) => {
  try {
    const { test } = req.query;

    // Find hospitals that have this test
    const hospitals = await Hospital.find({
      "tests.testName": { $regex: test, $options: "i" }
    });

    res.json(hospitals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Get hospital details
// @route GET /api/hospitals/:id
const getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) return res.status(404).json({ message: "Hospital not found" });
    res.json(hospital);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Admin add hospital
// @route POST /api/hospitals
const addHospital = async (req, res) => {
  try {
    const hospital = await Hospital.create(req.body);
    res.status(201).json(hospital);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Admin update hospital
// @route PUT /api/hospitals/:id
const updateHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(hospital);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Admin delete hospital
// @route DELETE /api/hospitals/:id
const deleteHospital = async (req, res) => {
  try {
    await Hospital.findByIdAndDelete(req.params.id);
    res.json({ message: "Hospital deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getHospitals, getHospitalById, addHospital, updateHospital, deleteHospital };
