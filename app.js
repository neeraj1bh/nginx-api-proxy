// Import required packages
const express = require("express");

// Create an Express application
const app = express();

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Define a route for a custom URL
app.get("/test", (req, res) => {
  res.send("This is a test route.");
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
