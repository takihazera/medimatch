const Review = require('../models/Review');

// @desc Get reviews for hospital
// @route GET /api/reviews/:hospitalId
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ hospital: req.params.hospitalId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Add review
// @route POST /api/reviews
const addReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getReviews, addReview };
