// backend/routes/recipeRoutes.js
const express = require('express');
const { getRecipesByIngredients, getRecipeById } = require('../controllers/recipeController');
const router = express.Router();

router.get('/recipes', getRecipesByIngredients);

router.get('/recipes/:id', getRecipeById);

module.exports = router;
