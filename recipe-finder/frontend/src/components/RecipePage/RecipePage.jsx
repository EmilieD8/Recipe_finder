import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipesById } from '../../services/api';
import './RecipePage.css';

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeData = await fetchRecipesById(id);
        setRecipe(recipeData);
      } catch (err) {
        setError('Failed to fetch recipe details.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  useEffect(() => {
    if (recipe?.instructions) {
      setInstructions(recipe.instructions.split('.'));
    }
  }, [recipe]);

  if (loading) return <p>Loading recipe details...</p>;
  if (error) return <p>{error}</p>;
  if (!recipe) return <p>No recipe found.</p>;

  return (
    <div className="RecipePage">
      <h1>{recipe.name}</h1>
      <img 
        src={`${process.env.PUBLIC_URL}${recipe.image}`} 
        alt={`${recipe.name}`} 
        className="recipe-image" 
      />
      <p>{recipe.description}</p>
      <h2>Prep Time:</h2>
        <p>{recipe.prepTime} minutes</p> 
      <h2>Ingredients:</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index} className="ingredient-item">
            <input
              type="checkbox"
              id={`ingredient-${index}`}
              className="ingredient-checkbox"
            />
            <label htmlFor={`ingredient-${index}`}>
              {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
            </label>
          </li>
        ))}
      </ul>
      <h2>Instructions:</h2>
      <ul >
        {instructions.map((instruction, index) => (
          <li className='instruction' key={index}>{instruction}.</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipePage;
