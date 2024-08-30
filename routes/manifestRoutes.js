const express = require('express');
const router = express.Router();
const manifestController = require('../controllers/manifestController');

router.get('/', manifestController.getManifests);
router.get('/:id', manifestController.getManifestById);
router.post('/', manifestController.createManifest);
router.put('/:id', manifestController.updateManifest);
router.delete('/:id', manifestController.deleteManifest);

module.exports = router;
