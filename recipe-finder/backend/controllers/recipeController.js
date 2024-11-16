// backend/controllers/recipeController.js
const recipes = require('../data/recipes.json');

// Fetch all recipes by ingredients
const getRecipesByIngredients = (req, res) => {
  const ingredientsQuery = req.query.ingredients;
  if (!ingredientsQuery) {
    return res.status(200).json(recipes);
  }

  const ingredientsArray = ingredientsQuery.split(',').map(ingredient => ingredient.trim().toLowerCase());

  const matchingRecipes = recipes.filter(recipe =>
    recipe.ingredients.some(ingredient =>
      ingredientsArray.includes(ingredient.toLowerCase())
    )
  );

  if (matchingRecipes.length === 0) {
    return res.status(404).json({ message: 'No recipes found for the given ingredients.' });
  }

  return res.status(200).json(matchingRecipes);
};

//Fetch by ID
const getRecipeById = (req, res) => {
  const recipeId = parseInt(req.params.id);
  const recipe = recipes.find(r => r.id === recipeId);

  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found.' });
  }

  return res.status(200).json(recipe);
};

module.exports = { getRecipesByIngredients, getRecipeById };
