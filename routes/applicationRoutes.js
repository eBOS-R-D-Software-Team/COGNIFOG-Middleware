const express = require('express');
const applicationController = require('../controllers/applicationController');
const router = express.Router();

router.post('/createApp', applicationController.createApplication);
router.get('/getAllApplications', applicationController.getApplications);

// ✅ Get all applications with their details (Components, Jobs, Channels)
router.get('/getAllApplicationDetails', applicationController.getAllApplicationDetails);
router.get('/:id', applicationController.getApplicationById);
router.put('/:id', applicationController.updateApplication);
router.delete('/:id', applicationController.deleteApplication);

module.exports = router;
