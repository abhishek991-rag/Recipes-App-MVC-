const Recipe = require("../models/recipeModel");

// @desc    Create a new recipe
// @route   POST /api/recipes
// @access  Public
const createRecipe = async (req, res) => {
  try {
    const {
      title,
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      servings,
      difficulty,
    } = req.body;

    // Basic validation for required fields
    if (!title || !description || !ingredients || !instructions) {
      return res
        .status(400)
        .json({
          message:
            "Please include all required fields: title, description, ingredients, instructions.",
        });
    }

    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      servings,
      difficulty,
    });

    res.status(201).json(recipe); // 201 Created
  } catch (error) {
    // Handle Mongoose validation errors (e.g., unique title)
    if (error.code === 11000 && error.keyPattern && error.keyPattern.title) {
      return res
        .status(400)
        .json({ message: "A recipe with this title already exists." });
    }
    res
      .status(500)
      .json({ message: "Error creating recipe", error: error.message });
  }
};

// @desc    Get all recipes
// @route   GET /api/recipes
// @access  Public
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.status(200).json(recipes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching recipes", error: error.message });
  }
};

// @desc    Get a single recipe by ID
// @route   GET /api/recipes/:id
// @access  Public
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    // Handle invalid MongoDB ID format
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid recipe ID format." });
    }
    res
      .status(500)
      .json({ message: "Error fetching recipe", error: error.message });
  }
};

// @desc    Update a recipe by ID
// @route   PUT /api/recipes/:id
// @access  Public
const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(updatedRecipe);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid recipe ID format." });
    }
    // Handle Mongoose validation errors (e.g., unique title violation on update)
    if (error.code === 11000 && error.keyPattern && error.keyPattern.title) {
      return res
        .status(400)
        .json({ message: "A recipe with this title already exists." });
    }
    // Handle other validation errors (e.g., min/max for numbers, enum for strings)
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res
        .status(400)
        .json({ message: "Validation error", errors: messages });
    }
    res
      .status(500)
      .json({ message: "Error updating recipe", error: error.message });
  }
};

// @desc    Delete a recipe by ID
// @route   DELETE /api/recipes/:id
// @access  Public
const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await Recipe.findByIdAndDelete(id);

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res
      .status(200)
      .json({ message: "Recipe deleted successfully", deletedRecipe });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid recipe ID format." });
    }
    res
      .status(500)
      .json({ message: "Error deleting recipe", error: error.message });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
