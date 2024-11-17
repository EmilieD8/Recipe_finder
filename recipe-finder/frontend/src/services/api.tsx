import { Recipe } from '../types.tsx';

const API_BASE = 'http://localhost:5000/api';

// Fetch recipes by ingredients
export const fetchRecipesByIngredients = async (ingredients: string): Promise<Recipe[]> => {
  if (!ingredients.trim()) {
    throw new Error("Ingredients query cannot be empty");
  }
  
  try {
    const response = await fetch(`${API_BASE}/recipes?ingredients=${ingredients}`);

    if (!response.ok) {
      throw new Error(`Error fetching recipes: ${response.statusText}`);
    }

    const data: Recipe[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchRecipesByIngredients:", error);
    throw error;
  }
};

// Fetch recipe by ID
export const fetchRecipesById = async (id: string): Promise<Recipe> => {
  if (!id) {
    throw new Error("Recipe ID is required");
  }

  try {
    const response = await fetch(`${API_BASE}/recipes/${id}`);

    if (!response.ok) {
      throw new Error(`Error fetching recipe: ${response.statusText}`);
    }

    const data: Recipe = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchRecipesById:", error);
    throw error;
  }
};
