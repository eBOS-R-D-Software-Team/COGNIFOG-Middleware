const express = require('express');
const router = express.Router();
const analysisResultController = require('../controllers/analysisResultController');

// Define the POST route
router.post('/analysisResult', analysisResultController.upload.single('file'), analysisResultController.analysisResult);

module.exports = router;
