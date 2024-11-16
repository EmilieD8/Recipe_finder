import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import RecipeList from '../../components/RecipeList/RecipeList';
import './Home.css';
import { fetchRecipesByIngredients } from '../../services/api';
import { fetchRecipesById } from '../../services/api';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSearch = async (query) => {
    setRecipes([]);
    setLoading(true);
    setError('');
    console.log("query:", query); 
    if (!query) {
      console.log("query is empty");
      setError('Please enter a valid search term');
      setLoading(false);
      return;
    }
    if (/^[\d]+$/.test(query)) { // Get recipe by id
      try {
        const response = await fetchRecipesById(query);
        setRecipes([response]);
      } catch (err) {
        setError('Sorry, that recipe does not exist');
      } finally {
        setLoading(false);
      }
    } else if (/^[a-zA-Z, ]+$/.test(query)) { // Get recipe by ingredients
      try {
        const response = await fetchRecipesByIngredients(query);
        setRecipes(response);
      } catch (err) {
        setError('Sorry, we could not find any recipes with these ingredients');
      } finally {
        setLoading(false);
      }
    } 
    else {
      setError('Sorry, this is not a valid term');
      setLoading(false);
    }
  };

  const handleRecipeClick = async (id) => {
    setLoading(true);
    setError('');
    try {
      const recipe = await fetchRecipesById(id);
      setSelectedRecipe(recipe);
    } catch (err) {
      setError('Error fetching recipe details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="presentation">
        <h1>Welcome to a plant-based life!</h1>
        <h2>Here you can find various vegan recipes.</h2>
        <h2> You can use our search bar to look by ingredients, or by recipe number directly.</h2>
      </div>
      <div>
        <SearchBar onSearch={handleSearch} />
        {loading && <div className="spinner">Searching...</div>}
        <RecipeList recipes={recipes} onRecipeClick={handleRecipeClick} error={error} />
      </div>
    </main>
  );
}

export default Home;
