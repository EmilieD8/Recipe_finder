import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/Presentational/SearchBar/SearchBar.tsx';
import RecipeList from '../../components/Presentational/RecipeList/RecipeList.tsx';
import { fetchRecipesByIngredients, fetchRecipesById } from '../../services/api.tsx';
import RecipeCard from '../../components/Presentational/RecipeCard/RecipeCard.tsx';
import Filter from '../../components/Presentational/Filter/Filter.tsx';
import { Recipe } from '../../types.tsx';
import './Home.scss';


const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [exampleRecipes, setExampleRecipes] = useState<Recipe[]>([]);
  const [filterCriteria, setFilterCriteria] = useState<string>('');

  useEffect(() => {
    const fetchExampleRecipes = async () => {
      try {
        const recipe1 = await fetchRecipesById('1');
        const recipe2 = await fetchRecipesById('2');
        const recipe3 = await fetchRecipesById('3');
        setExampleRecipes([recipe1, recipe2, recipe3]);
      } catch (err) {
        setError('Error fetching example recipes');
      }
    };

    fetchExampleRecipes();
  }, []);

  useEffect(() => {
    if (filterCriteria) {
      let sortedRecipes = [...recipes];
  
      if (filterCriteria === 'time') {
        sortedRecipes.sort((a, b) => a.prepTime - b.prepTime);
      } else if (filterCriteria === 'alphabetically') {
        sortedRecipes.sort((a, b) => a.name.localeCompare(b.name));
      } else if (filterCriteria === 'default') {
        sortedRecipes.sort((a, b) => a.id - b.id);
      }
        if (JSON.stringify(sortedRecipes) !== JSON.stringify(recipes)) {
        setRecipes(sortedRecipes);
      }
    }
  }, [filterCriteria, recipes]);

  const handleSearch = async (query: string) => {
    setRecipes([]);
    setLoading(true);
    setError('');
    if (!query) { //fetch all recipes
      try {
        const response = await fetchRecipesByIngredients('');
        setRecipes(response);
      } catch (err) {
        setError('Sorry, we could not fetch all recipes.');
      } finally {
        setLoading(false);
      }
      return;
    }
    
    if (/^[\d]+$/.test(query)) { // Get recipe by id
      try {
        const response = await fetchRecipesById(query);
        setRecipes([response]);
      } catch (err) {
        setError('Sorry, that recipe does not exist.');
      } finally {
        setLoading(false);
      }
    } else if (/^[a-zA-Z, ]+$/.test(query)) { // Get recipe by ingredients
      try {
        const response = await fetchRecipesByIngredients(query);
        setRecipes(response);
      } catch (err) {
        setError('Sorry, we could not find any recipes with these ingredients.');
      } finally {
        setLoading(false);
      }
    }
    else {
      setError('Sorry, this is not a valid term, use either ingredients or the recipe number.');
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="presentation">
        <h1>Welcome to your plant-based life!</h1>
        <h2>Here you can find various vegan recipes.</h2>
        <h2>You can use our search bar to look by ingredients, or by recipe number directly.</h2>
      </div>
      <div>
        <SearchBar onSearch={handleSearch} />
        <Filter onFilterChange={setFilterCriteria} />
        {loading && <div className="spinner">Searching...</div>}
        <RecipeList recipes={recipes} error={error} />
        <div className="Examples">
          <p>A few examples of our recipes:</p>
          {exampleRecipes.map((recipe, index) => (
            <div key={index} className="example-recipe">
              <img src={recipe.image} alt={recipe.name} className="recipe-image" />
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Home;
