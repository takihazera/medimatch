const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
  user: { type: String, default: 'Anonymous' },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
