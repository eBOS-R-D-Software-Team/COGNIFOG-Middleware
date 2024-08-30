const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const applicationRoutes = require('./routes/applicationRoutes');
const componentRoutes = require('./routes/componentRoutes');
const channelRoutes = require('./routes/channelRoutes');
const manifestRoutes = require('./routes/manifestRoutes');
const jobRoutes = require('./routes/jobRoutes');
const sequelize = require('./config/sequelize');

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use('/api/applications', applicationRoutes);
app.use('/api/components', componentRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/manifests', manifestRoutes);
app.use('/api/jobs', jobRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    console.log('Executing (default): SELECT 1+1 AS result');
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
