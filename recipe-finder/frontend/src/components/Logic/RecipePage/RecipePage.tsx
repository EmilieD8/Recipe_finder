import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { fetchRecipesById } from '../../../services/api.tsx';
import './RecipePage.scss';
import { Recipe } from '../../../types.tsx';


const RecipePage: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [instructions, setInstructions] = useState<string[]>([]);


  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) {
        setError('Recipe ID is missing.');
        setLoading(false);
        return;
      }
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
    <div className="recipePage">
      <h1>{recipe.name}</h1>
      <img 
        src={`${process.env.PUBLIC_URL}${recipe.image}`} 
        alt={`${recipe.name}`} 
        className="recipePage__image" 
      />
      <p>{recipe.description}</p>
      <h2>Prep Time:</h2>
        <p>{recipe.prepTime} minutes</p> 
      <h2>Ingredients:</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index} className="recipePage__ingredient">
            <input
              type="checkbox"
              id={`ingredient-${index}`}
              className="recipePage__ingredient__checkbox"
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
          <li className='recipePage__instruction' key={index}>{instruction}.</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipePage;
