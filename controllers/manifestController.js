const { Manifest } = require('../models');

// Get all manifests
exports.getManifests = async (req, res) => {
  try {
    const manifests = await Manifest.findAll();
    res.status(200).json(manifests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a manifest by ID
exports.getManifestById = async (req, res) => {
  try {
    const manifest = await Manifest.findByPk(req.params.id);
    if (manifest) {
      res.status(200).json(manifest);
    } else {
      res.status(404).json({ error: 'Manifest not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new manifest
exports.createManifest = async (req, res) => {
  try {
    const manifest = await Manifest.create(req.body);
    res.status(201).json(manifest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing manifest
exports.updateManifest = async (req, res) => {
  try {
    const manifest = await Manifest.findByPk(req.params.id);
    if (manifest) {
      await manifest.update(req.body);
      res.status(200).json(manifest);
    } else {
      res.status(404).json({ error: 'Manifest not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a manifest
exports.deleteManifest = async (req, res) => {
  try {
    const manifest = await Manifest.findByPk(req.params.id);
    if (manifest) {
      await manifest.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Manifest not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
