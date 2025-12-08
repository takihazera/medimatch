const Test = require('../models/Test');

// @desc Search tests by name
// @route GET /api/tests?name=<testName>
const searchTests = async (req, res) => {
  try {
    const { name } = req.query;
    const tests = await Test.find({ testName: { $regex: name, $options: "i" } });
    res.json(tests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { searchTests };
