import React from 'react';
import '../index.css'; // Import global styles

const RecipeCard = ({ title, description }) => {
    return (
        <div className="recipe-card">
            <h3>{title}</h3>
            <p>{description}</p>
            <button>View Recipe</button>
        </div>
    );
};

export default RecipeCard;
