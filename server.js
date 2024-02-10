// Import required modules
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Create an express application
const app = express();

// Define the port number
// Use the environment variable PORT if available, otherwise use port 3001
const PORT = process.env.PORT || 3001;

// Middleware to pare incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Use API routes
app.use('/api', apiRoutes);

// Use HTML routes
app.use('/', htmlRoutes);

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
    console.log('Server running on http://localhost:${PORT}');
});

