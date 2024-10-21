const express = require('express');
const dotenv = require('dotenv');
const applicationRoutes = require('./routes/applicationRoutes');
const componentRoutes = require('./routes/componentRoutes');
const channelRoutes = require('./routes/channelRoutes');
const manifestRoutes = require('./routes/manifestRoutes');
const jobRoutes = require('./routes/jobRoutes');
const sequelize = require('./config/sequelize');
const cors = require('cors');

dotenv.config();

const app = express();

// Allow requests from your frontend origin
app.use(cors({
  origin: 'http://localhost:3001',  // Make sure this is your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify allowed methods
  credentials: true  // Allow credentials if needed (e.g., for cookies)
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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
