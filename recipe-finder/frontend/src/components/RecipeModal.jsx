import React from 'react';

const RecipeModal = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div>
      <button onClick={onClose}>Close</button>
      <h2>{recipe.name}</h2>
      <p>{recipe.description}</p>
      <p>Prep Time: {recipe.prepTime} mins</p>
      <ul>
        {recipe.ingredients.map((ing, idx) => (
          <li key={idx}>{ing}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeModal;
