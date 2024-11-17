"use strict";
// backend/routes/recipeRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recipeController_1 = require("../controllers/recipeController");
const router = express_1.default.Router();
router.get('/', recipeController_1.getRecipesByIngredients);
router.get('/:id', recipeController_1.getRecipeById);
exports.default = router;
