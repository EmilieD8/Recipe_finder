import React from 'react';
import RecipeCard from '../RecipeCard/RecipeCard.tsx';
import './RecipeList.css';
import { Recipe } from '../../types';

interface RecipeListProps {
  recipes: Recipe[];
  error: string;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, error }) => {
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
        />
        ))}
    </div>
  );
};

export default RecipeList;
