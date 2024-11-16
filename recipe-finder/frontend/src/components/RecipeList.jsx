import React from 'react';

const RecipeList = ({ recipes, onRecipeClick }) => {
  if (!recipes || recipes.length === 0) {
    return <p>No recipes found.</p>;
  }

  return (
    <div>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <h3>{recipe.name}</h3>
            <p>Prep time: {recipe.prepTime} minutes</p>
            <button onClick={() => onRecipeClick(recipe.id)}>View More</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
