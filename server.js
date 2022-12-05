// IMPORT REQUIRED PACKAGES/MODULES
// Import/require Express JS
const express = require('express');
// Import and require console.table
const cTable = require('console.table');

// Create Express app port and instance
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ----------------------------------------------
// Express routes in here... 

// ----------------------------------------------

// Create Express Listener
app.listen(PORT, () => {
  console.log(`Employee Tracker App Server running on port ${PORT}`);
});
