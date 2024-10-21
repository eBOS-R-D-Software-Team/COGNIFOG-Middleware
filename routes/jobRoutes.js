const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const multer = require('multer');

// Initialize multer for form-data
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define job routes
router.get('/', jobController.getJobs);
router.get('/:id', jobController.getJobById);

// Create a new job for a specific component with manifest
router.post('/:componentId/jobs', upload.single('manifest'), jobController.createJob);

// Update and delete routes remain unchanged
router.put('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteJob);

router.get('/:jobId/download', jobController.downloadManifest);

module.exports = router;
