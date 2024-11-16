const API_BASE = 'http://localhost:5000';

export const fetchRecipesByIngredients = async (ingredients) => {
  try {
    const response = await fetch(`${API_BASE}/recipes?ingredients=${ingredients}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching recipes: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchRecipesByIngredients:", error);
    throw error;
  }
};

export const fetchRecipesById = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/recipes/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching recipe: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchRecipesById:", error);
    throw error;
  }
};
