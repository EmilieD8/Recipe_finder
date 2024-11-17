import React from "react";
import {Recipe} from "../../../types";
import './RecipeCard.scss';
import { Link } from 'react-router-dom';

interface RecipeCardProps {
    recipe: Recipe;
  }

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {

    return (
        <div className='card'>
            <h3>{recipe.name}</h3>
            <p>Prep time: {recipe.prepTime} minutes</p>
            <Link to={`/recipes/${recipe.id}`} className="card__button">
                View Details
            </Link>       
        </div>
    );
};

export default RecipeCard;
