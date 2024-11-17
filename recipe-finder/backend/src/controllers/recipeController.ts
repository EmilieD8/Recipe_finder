import { Request, Response } from 'express';
import recipes from '../data/recipes.json';

// Fetch all recipes by ingredients
export const getRecipesByIngredients = (req: Request, res: Response): void => {
  const ingredientsQuery = req.query.ingredients as string;

  if (!ingredientsQuery) {
    res.status(200).json(recipes);
    return;
  }

  const ingredientsArray = ingredientsQuery.split(',').map((ingredient) => ingredient.trim().toLowerCase());

  const matchingRecipes = recipes.filter((recipe) =>
    recipe.ingredients.some((ingredient) => ingredientsArray.includes(ingredient.toLowerCase()))
  );

  if (matchingRecipes.length === 0) {
    res.status(404).json({ message: 'No recipes found for the given ingredients.' });
    return;
  }

  res.status(200).json(matchingRecipes);
};

// Fetch recipe by ID
export const getRecipeById = (req: Request, res: Response): void => {
  const recipeId = parseInt(req.params.id, 10);
  const recipe = recipes.find((r) => r.id === recipeId);

  if (!recipe) {
    res.status(404).json({ message: 'Recipe not found.' });
    return;
  }

  res.status(200).json(recipe);
};