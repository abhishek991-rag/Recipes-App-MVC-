// app.js
require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// IMPORTANT: This line MUST be here to parse JSON request bodies
app.use(express.json()); // <--- ENSURE THIS LINE IS PRESENT AND CORRECTLY PLACED

// Routes
app.use('/api/recipes', recipeRoutes);

// Basic error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!', error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});