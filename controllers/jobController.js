const { Job } = require('../models'); 
const multer = require('multer');

// Initialize multer for form-data
const storage = multer.memoryStorage(); // Store file in memory as a buffer
const upload = multer({ storage: storage });

// Get all jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll(); 
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (job) {
      res.status(200).json(job);
    } else {
      res.status(404).json({ error: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new job with manifest as form-data
exports.createJob = async (req, res) => {
  try {
    const { executionTime, frequency, cpu, memory, serviceName } = req.body;
    const { componentId } = req.params; // Get componentId from URL parameters

    if (!req.file) {
      return res.status(400).json({ error: 'Manifest file is required' });
    }

    // Create a new job and store the manifest file as part of it
    const job = await Job.create({
      componentId,
      manifestFile: req.file.buffer, // Storing the file content as a buffer
      manifestName: req.file.originalname, // Storing the file name
      executionTime,
      frequency,
      cpu,
      memory,
      serviceName,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update an existing job
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (job) {
      await job.update(req.body);
      res.status(200).json(job);
    } else {
      res.status(404).json({ error: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (job) {
      await job.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.downloadManifest = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.jobId);
    if (!job || !job.manifestFile) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Set the content-type header to application/octet-stream for a binary file
    res.setHeader('Content-Type', 'application/octet-stream');

    // Set the content-disposition header to force download with the original file name
    res.setHeader('Content-Disposition', `attachment; filename=${job.manifestName}`);

    // Send the file (binary data) to the client
    res.send(job.manifestFile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};