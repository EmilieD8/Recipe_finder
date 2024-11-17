"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecipeById = exports.getRecipesByIngredients = void 0;
const recipes_json_1 = __importDefault(require("../data/recipes.json"));
// Fetch all recipes by ingredients
const getRecipesByIngredients = (req, res) => {
    const ingredientsQuery = req.query.ingredients;
    if (!ingredientsQuery) {
        res.status(200).json(recipes_json_1.default);
        return;
    }
    const ingredientsArray = ingredientsQuery.split(',').map((ingredient) => ingredient.trim().toLowerCase());
    const matchingRecipes = recipes_json_1.default.filter((recipe) => recipe.ingredients.some((ingredient) => ingredientsArray.includes(ingredient.toLowerCase())));
    if (matchingRecipes.length === 0) {
        res.status(404).json({ message: 'No recipes found for the given ingredients.' });
        return;
    }
    res.status(200).json(matchingRecipes);
};
exports.getRecipesByIngredients = getRecipesByIngredients;
// Fetch recipe by ID
const getRecipeById = (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
    const recipe = recipes_json_1.default.find((r) => r.id === recipeId);
    if (!recipe) {
        res.status(404).json({ message: 'Recipe not found.' });
        return;
    }
    res.status(200).json(recipe);
};
exports.getRecipeById = getRecipeById;
