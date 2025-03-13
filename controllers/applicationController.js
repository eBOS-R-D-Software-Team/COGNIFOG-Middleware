const { Application,Component, Job, Channel } = require('../models/index.js');

// Get all applications
exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.findAll();
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications: ', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllApplicationDetails = async (req, res) => {
  try {
    // Fetch all applications with their related components, jobs, and channels
    const applications = await Application.findAll({
      include: [
        {
          model: Component,
          as: 'components',
          include: [
            { model: Job, as: 'jobs' },
          ],
        },
        {
          model: Channel, // ✅ Fetch Channels at Application Level
          as: 'channels',
        },
      ],
    });

    if (!applications.length) {
      return res.status(404).json({ error: 'No applications found' });
    }

    // Structure the response
    const response = applications.map(application => ({
      applicationId: application.id,
      applicationName: application.name,
      components: application.components.map(component => ({
        id: component.id,
        name: component.name,
        jobs: component.jobs,
      })),
      channels: application.channels.map(channel => ({  //  channels are included correctly
        id: channel.id,
        incomingComponentId: channel.incomingComponentId,
        outgoingComponentId: channel.outgoingComponentId,
      })),
    }));

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching application details:', error);
    return res.status(500).json({ error: error.message });
  }
};



// Get an application by ID
exports.getApplicationById = async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id);
    if (application) {
      res.status(200).json(application);
    } else {
      res.status(404).json({ error: 'Application not found' });
    }
  } catch (error) {
    console.error('Error fetching application by ID: ', error);
    res.status(500).json({ error: error.message });
  }
};

// Create a new application
exports.createApplication = async (req, res) => {
  try {
    console.log('Request body received from frontend:', req.body);  // Log request body

    const { applicationName, description } = req.body;

    // Check if required fields are present
    if (!applicationName || !description) {
      return res.status(400).json({ message: 'applicationName and description are required' });
    }

    // Map applicationName to the `name` field in the database
    const application = await Application.create({ name: applicationName, description });
    console.log('Application successfully created:', application);  // Log success response
    res.status(201).json(application);
  } catch (error) {
    console.error('Error creating application:', error);  // Log error details
    res.status(500).json({ error: error.message });
  }
};


// Create a new application



// Update an existing application
exports.updateApplication = async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id);
    if (application) {
      await application.update(req.body);
      res.status(200).json(application);
    } else {
      res.status(404).json({ error: 'Application not found' });
    }
  } catch (error) {
    console.error('Error updating application: ', error);
    res.status(500).json({ error: error.message });
  }
};

// Delete an application
exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id);
    if (application) {
      await application.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Application not found' });
    }
  } catch (error) {
    console.error('Error deleting application: ', error);
    res.status(500).json({ error: error.message });
  }
};
