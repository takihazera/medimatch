const express = require('express');
const router = express.Router();
const { searchTests } = require('../controllers/testController');

router.get('/', searchTests);

module.exports = router;
