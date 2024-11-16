import React from 'react';
import './RecipeCard.css';
import { Link } from 'react-router-dom';


const RecipeCard = ({ recipe }) => {

    return (
        <div className='Card'>
            <h3>{recipe.name}</h3>
            <p>Prep time: {recipe.prepTime} minutes</p>
            <Link to={`/recipes/${recipe.id}`}>
                <button>View Details</button>
            </Link>       
        </div>
    );
};

export default RecipeCard;
