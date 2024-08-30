const { Application ,Component } = require('../models');

// Get all components
exports.getComponents = async (req, res) => {
  try {
    const components = await Component.findAll();
    res.status(200).json(components);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a component by ID
exports.getComponentById = async (req, res) => {
  try {
    const component = await Component.findByPk(req.params.id);
    if (component) {
      res.status(200).json(component);
    } else {
      res.status(404).json({ error: 'Component not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new component
exports.createComponent = async (req, res) => {
  try {
    const component = await Component.create(req.body);
    res.status(201).json(component);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing component
exports.updateComponent = async (req, res) => {
  try {
    const component = await Component.findByPk(req.params.id);
    if (component) {
      await component.update(req.body);
      res.status(200).json(component);
    } else {
      res.status(404).json({ error: 'Component not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a component
exports.deleteComponent = async (req, res) => {
  try {
    const component = await Component.findByPk(req.params.id);
    if (component) {
      await component.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Component not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createComponentForApplication = async (req, res) => {
  const { applicationId } = req.params;
  const { name, ManifestName, ExecutionTime, Frequency, Cpu, Memory, ServiceName } = req.body;

  try {
    // Find the application by ID
    const application = await Application.findByPk(applicationId);

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Create the component associated with the application
    const component = await Component.create({
      name,
      ManifestName,
      ExecutionTime,
      Frequency,
      Cpu,
      Memory,
      ServiceName,
      ApplicationId: applicationId, // Assuming ApplicationId is the foreign key in the Component model
    });

    res.status(201).json(component);
  } catch (error) {
    console.error('Error creating component:', error);
    res.status(500).json({ error: 'An error occurred while creating the component' });
  }
};