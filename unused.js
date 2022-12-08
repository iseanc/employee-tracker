// server.js (renamed to index.js)
// Import/require Express JS
const express = require('express');

// Create Express app port and instance
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create Express Listener
app.listen(PORT, () => {
  console.log(`Employee Tracker App Server running on port ${PORT}`);
});