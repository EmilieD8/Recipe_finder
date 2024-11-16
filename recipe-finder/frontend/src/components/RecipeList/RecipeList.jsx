import React from 'react';
import RecipeCard from '../RecipeCard/RecipeCard';
import './RecipeList.css';

const RecipeList = ({ recipes, onRecipeClick, error }) => {
  if (error) {
    return <p>{error}</p>;
  }

  if (!recipes || recipes.length === 0) {
    return ;
  }

  return (
    <div className='Recipes'>
        {recipes.map((recipe) => (
          <RecipeCard 
          key={recipe.id} 
          recipe={recipe} 
          onRecipeClick={onRecipeClick} 
        />
        ))}
    </div>
  );
};

export default RecipeList;
