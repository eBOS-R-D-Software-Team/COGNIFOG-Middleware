const fs = require('fs');
const path = require('path');
const { AnalysisResult, Application, sequelize } = require('../models');  // Assuming your models are set up
const { v4: uuidv4 } = require('uuid');

// Multer setup for file upload handling
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST /analysisResult
exports.analysisResult = async (req, res) => {
  try {
    const { consistency, liveness, applicationId } = req.body;
    const file = req.file;

    // Check if application exists
    const application = await Application.findByPk(applicationId);
    if (!application) {
      return res.status(404).json({ isSucceeded: false, message: `Application with Id ${applicationId} not found.` });
    }

    // Check if file is a PNG
    const fileExtension = path.extname(file.originalname);
    if (fileExtension !== '.png') {
      return res.status(400).json({ isSucceeded: false, message: "File Extension Is InValid - Only Upload PNG File" });
    }

    // Check if analysis result already exists for this application
    const existingResult = await AnalysisResult.findOne({ where: { applicationId: applicationId } });
    if (existingResult) {
      return res.status(200).json({ isSucceeded: false, message: "The application is already linked to an Analysis Result." });
    }

    // Save file in memory (equivalent to MemoryStream in .NET)
    const fileBuffer = file.buffer;
    console.log("file buffer: ", fileBuffer);
    console.log("original name: ", file.originalname);
    console.log("liveness: ", liveness );
    // Create the analysis result
    const newAnalysisResult = await AnalysisResult.create({
      id: uuidv4(),
      consistency: consistency,
      liveness: liveness,
      fileName: file.originalname,
      fileExtension: file.mimetype,
      applicationId: applicationId,
      file: fileBuffer,  // Store the file as a BLOB
    });
    console.log("Adding analysis result happened");
    return res.status(201).json({ isSucceeded: true, message: "Analysis result created successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ isSucceeded: false, message: "Internal Server Error." });
  }
};


// Get all applications
exports.getAnalysis = async (req, res) => {
  try {
    const analysis = await AnalysisResult.findAll();

    res.status(200).json(analysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export multer configuration for file upload handling
exports.upload = upload;