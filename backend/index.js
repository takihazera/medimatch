// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

const hospitalRoutes = require('./routes/hospitalRoutes');

const testRoutes = require('./routes/testRoutes');

const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/hospitals', hospitalRoutes);

app.use('/api/tests', testRoutes);

app.use('/api/reviews', reviewRoutes);

connectDB();

// simple test route
app.get('/', (req, res) => {
  res.send({ message: 'Medimatch backend running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





