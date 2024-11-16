import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';
import RecipeModal from '../components/RecipeModal';
import { fetchRecipesByIngredients } from '../services/api';
import { fetchRecipesById } from '../services/api';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSearch = async (query) => {
    setRecipes("");
    setLoading(true);
    setError('');
    console.log("Search initiated with query:", query);  // Log the search query
    if (/^\d+$/.test(query)) {
      console.log("The query contains only numbers.");
      try {
        const response = await fetchRecipesById(query);
        console.log("Fetched recipes:", response);  // Log the response from the API
        setRecipes([response]); 
      } catch (err) {
        setError('Error fetching recipes by id');
      } finally {
        setLoading(false);
      }
    } else if (/^[a-zA-Z]+$/.test(query)) {
      console.log("The query contains only letters.");
      try {
        const response = await fetchRecipesByIngredients(query);
        console.log("Fetched recipes:", response);
        setRecipes(response);
      } catch (err) {
        setError('Error fetching recipes by ingredient');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Sorry, this is not a valid term');
      setLoading(false);

    }
  };

  const handleRecipeClick = async (id) => {
    setLoading(true);
    setError('');
    try {
      // Use the API function to fetch recipe details by ID
      const recipe = await fetchRecipesById(id);
      setSelectedRecipe(recipe);
    } catch (err) {
      setError('Error fetching recipe details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className='title'>Welcome to a plant-based life!</h1>
      <h2>Here you can find various vegan recipes. <br></br> You can use our search bar to look by ingredients. Divide your ingredients with a comma.</h2>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <RecipeList recipes={recipes} onRecipeClick={handleRecipeClick} />
      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  );
};

export default Home;
