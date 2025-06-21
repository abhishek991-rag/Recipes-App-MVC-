const express = require('express');
const router = express.Router();
const {
    createRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe
} = require('../controllers/recipeController');

// Define routes
router.post('/', createRecipe);          // Create a new recipe
router.get('/', getAllRecipes);          // Get all recipes
router.get('/:id', getRecipeById);       // Get a single recipe by ID
router.put('/:id', updateRecipe);        // Update a recipe by ID
router.delete('/:id', deleteRecipe);     // Delete a recipe by ID

module.exports = router;