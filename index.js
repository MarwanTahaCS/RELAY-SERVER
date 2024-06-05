const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

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
