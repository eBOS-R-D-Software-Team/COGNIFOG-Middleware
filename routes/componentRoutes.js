const express = require('express');
const router = express.Router();
const componentController = require('../controllers/componentController');

router.get('/', componentController.getComponents);
router.get('/:id', componentController.getComponentById);
router.post('/', componentController.createComponent);
router.put('/:id', componentController.updateComponent);
router.delete('/:id', componentController.deleteComponent);
router.post('/applications/:applicationId/components', componentController.createComponentForApplication);


module.exports = router;
