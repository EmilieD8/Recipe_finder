// backend/routes/recipeRoutes.ts

import express from 'express';
import { getRecipesByIngredients, getRecipeById } from '../controllers/recipeController';

const router = express.Router();

router.get('/', getRecipesByIngredients);

router.get('/:id', getRecipeById);

export default router;