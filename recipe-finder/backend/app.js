// backend/server.js or backend/app.js

const express = require('express');
const cors = require('cors');
const recipeRoutes = require('./routes/recipeRoutes');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use the recipe routes
app.use(recipeRoutes);

// Error-handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server. Please try again later.' });
});

module.exports = app;

