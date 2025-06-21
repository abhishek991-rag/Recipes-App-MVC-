const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Recipe title is required'],
        unique: true, // Ensures no two recipes have the same title
        trim: true // Removes whitespace from both ends of a string
    },
    description: {
        type: String,
        required: [true, 'Recipe description is required']
    },
    ingredients: {
        type: [String], // An array of strings
        required: [true, 'Ingredients are required']
    },
    instructions: {
        type: String,
        required: [true, 'Instructions are required']
    },
    prepTime: {
        type: Number, // in minutes
        min: 0 // Cannot be negative
    },
    cookTime: {
        type: Number, // in minutes
        min: 0 // Cannot be negative
    },
    servings: {
        type: Number,
        min: 1 // Must serve at least 1 person
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'], // Only these values are allowed
        default: 'Medium' // Default value if not provided
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Recipe', recipeSchema);