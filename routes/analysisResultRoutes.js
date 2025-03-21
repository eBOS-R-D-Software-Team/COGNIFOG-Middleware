const express = require('express');
const router = express.Router();
const analysisResultController = require('../controllers/analysisResultController');

// Define the POST route
router.post('/analysisResult', analysisResultController.upload.single('file'), analysisResultController.analysisResult);
router.get('/', analysisResultController.getAnalysis);
// Route to get analysis result by id
router.get('/:id', analysisResultController.getAnalysisResultById);

module.exports = router;
