const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  testName: { type: String, required: true, unique: true },
  description: { type: String },
  commonPriceRange: { type: String },
});

module.exports = mongoose.model('Test', testSchema);
