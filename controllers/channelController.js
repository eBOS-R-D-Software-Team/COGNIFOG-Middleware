const { Channel } = require('../models');

// Get all channels
exports.getChannels = async (req, res) => {
  try {
    const channels = await Channel.findAll();
    res.status(200).json(channels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a channel by ID
exports.getChannelById = async (req, res) => {
  try {
    const channel = await Channel.findByPk(req.params.id);
    if (channel) {
      res.status(200).json(channel);
    } else {
      res.status(404).json({ error: 'Channel not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new channel
exports.createChannel = async (req, res) => {
  try {
    const { applicationId, incomingComponentId, outgoingComponentId } = req.body;

    // Ensure all required fields are present
    if (!applicationId || !incomingComponentId || !outgoingComponentId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a new channel
    const newChannel = await Channel.create({
      applicationId,
      incomingComponentId,
      outgoingComponentId,
    });

    return res.status(201).json(newChannel);
  } catch (error) {
    console.error('Error creating channel:', error);
    return res.status(500).json({ error: error.message });
  }
};

// Update an existing channel
exports.updateChannel = async (req, res) => {
  try {
    const channel = await Channel.findByPk(req.params.id);
    if (channel) {
      await channel.update(req.body);
      res.status(200).json(channel);
    } else {
      res.status(404).json({ error: 'Channel not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a channel
exports.deleteChannel = async (req, res) => {
  try {
    const channel = await Channel.findByPk(req.params.id);
    if (channel) {
      await channel.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Channel not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
