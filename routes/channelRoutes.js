const express = require('express');
const router = express.Router();
const channelController = require('../controllers/channelController');

router.get('/', channelController.getChannels);
router.get('/:id', channelController.getChannelById);
router.post('/create', channelController.createChannel);
router.put('/:id', channelController.updateChannel);
router.delete('/:id', channelController.deleteChannel);

module.exports = router;
