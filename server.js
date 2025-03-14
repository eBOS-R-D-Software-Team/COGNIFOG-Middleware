const express = require('express');
const dotenv = require('dotenv');
const http = require('http');  // Required to create the server for both HTTP and WebSocket
const { Server } = require('ws');  // WebSocket library
const applicationRoutes = require('./routes/applicationRoutes');
const componentRoutes = require('./routes/componentRoutes');
const channelRoutes = require('./routes/channelRoutes');
const manifestRoutes = require('./routes/manifestRoutes');
const jobRoutes = require('./routes/jobRoutes');
const sequelize = require('./config/sequelize');
const analysisResultRoutes = require('./routes/analysisResultRoutes');

const { Application, Channel, Job, Component } = require('./models');  // Import the Application model

const cors = require('cors');

const analysisResult = require('./models/analysisResult');


dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:3000','http://cognifog-middleware.onrender.com', 'https://cognifog-frontend.netlify.app', 'https://cognifog.ebosrndportal.com'],  // Make sure this is your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS'],  // Specify allowed methods
  credentials: true,  // Allow credentials if needed (e.g., for cookies)
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers  
  exposedHeaders:["access-control-allow-origin","access-control-allow-methods","access-control-allow-headers"]
}));

// Handle preflight OPTIONS requests
app.options('*', cors({
  origin: ['http://localhost:3000','http://cognifog-middleware.onrender.com', 'https://cognifog-frontend.netlify.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  exposedHeaders: ["access-control-allow-origin", "access-control-allow-methods", "access-control-allow-headers"]
}));


// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Route middleware
app.use('/api/applications', applicationRoutes);
app.use('/api/components', componentRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/manifests', manifestRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/analysisresult', analysisResultRoutes);


// Create the HTTP server
const server = http.createServer(app);

// WebSocket setup
const wss = new Server({ server });  // WebSocket Server running on the same HTTP server

// Broadcast a message to all connected WebSocket clients
function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(data);
    }
  });
}

// WebSocket connection event
wss.on('connection', (ws) => {
  console.log('New WebSocket client connected');
  ws.send('Welcome to the WebSocket server!');

  // Handle WebSocket message event if needed
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});


app.get('/api/applications/getApplicationInformation/:applicationId', async (req, res) => {
  try {
    const { applicationId } = req.params;

    // Fetch the application details
    const application = await Application.findByPk(applicationId);

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Fetch all components that belong to the given applicationId
    const components = await Component.findAll({
      where: { applicationId },
      include: [
        {
          model: Job, // Include related Jobs for each Component
          as: 'jobs',
        },
        {
          model: Channel,
          as: 'incomingChannels', // Include channels where the component is the incomingComponent
          foreignKey: 'incomingComponentId',
        },
        {
          model: Channel,
          as: 'outgoingChannels', // Include channels where the component is the outgoingComponent
          foreignKey: 'outgoingComponentId',
        },
      ],
    });

    if (!components.length) {
      return res.status(404).json({ error: 'No components found for this applicationId' });
    }

    // Structure the response
    const response = {
      applicationId: application.id,
      applicationName: application.name, // Include the application name
      components: components.map((component) => ({
        id: component.id,
        name: component.name,
        jobs: component.jobs,
        incomingChannels: component.incomingChannels,
        outgoingChannels: component.outgoingChannels,
      })),
    };

    broadcast("new application submitted!");
    broadcast(JSON.stringify(response));

    // Return the related data in a structured JSON response
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




// POST route to trigger WebSocket message
app.post('/api/Polygraph/SendApplication', (req, res) => {
  const { rawText } = req.body;

  if (!rawText) {
    return res.status(400).json({ message: 'rawText is required in the request body' });
  }

  // Broadcast the rawText to all WebSocket clients
  broadcast(rawText);

  return res.status(200).json({ message: 'Data sent to WebSocket clients successfully' });
});



const PORT = process.env.PORT || 3000;

// Start the server
server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

// Export the broadcast function
module.exports = {
  app,  // if you're exporting the Express app too
  broadcast,
};
