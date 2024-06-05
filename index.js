const express = require('express');
const cors = require('cors'); // Import cors
const app = express();
const port = process.env.PORT || 3000;

// Load environment variables from .env file
require('dotenv').config();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Your API key from environment variables
const API_KEY = process.env.API_KEY;

// Middleware to check API key
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey && apiKey === API_KEY) {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden' });
  }
});

// Default relay status
let relayStatus = {
  relay1: 'off',
  relay2: 'off'
  // Add more relays as needed
};

// Route to get relay status
app.get('/status/:relay', (req, res) => {
  const relay = req.params.relay;
  if (relayStatus[relay]) {
    res.json({ status: relayStatus[relay] });
  } else {
    res.status(404).json({ error: 'Relay not found' });
  }
});

// Route to update relay status
app.post('/status/:relay', (req, res) => {
  const relay = req.params.relay;
  const status = req.body.status;

  if (relayStatus[relay] && (status === 'on' || status === 'off')) {
    relayStatus[relay] = status;
    res.json({ message: 'Status updated', status: relayStatus[relay] });
  } else {
    res.status(400).json({ error: 'Invalid request' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
