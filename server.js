const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const http = require('http');  // Required to create the server for both HTTP and WebSocket
const { Server } = require('ws');  // WebSocket library
const applicationRoutes = require('./routes/applicationRoutes');
const componentRoutes = require('./routes/componentRoutes');
const channelRoutes = require('./routes/channelRoutes');
const manifestRoutes = require('./routes/manifestRoutes');
const jobRoutes = require('./routes/jobRoutes');
const sequelize = require('./config/sequelize');
const analysisResult = require('./models/analysisResult');

const { Application } = require('./models');  // Import the Application model

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use('/api/applications', applicationRoutes);
app.use('/api/components', componentRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/manifests', manifestRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/analysisresult', analysisResult);


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

// POST /api/applications
app.post('/api/applications', async (req, res) => {
  try {
    const application = await Application.create(req.body);

    // Broadcast the success message after application creation
    const message = `Application created: ${application.name}`;
    broadcast(message);  // Send the message to all WebSocket clients

    res.status(201).json(application);
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

// app.listen(PORT, async () => {
//   console.log(`Server is running on port ${PORT}`);
//   try {
//     console.log('Executing (default): SELECT 1+1 AS result');
//     await sequelize.authenticate();
//     console.log('Database connected!');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// });
// Start the server
server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    console.log('Executing (default): SELECT 1+1 AS result');
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