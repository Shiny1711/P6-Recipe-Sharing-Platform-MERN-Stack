// import React from 'react';

// const MyRecipes = () => {
//     return (
//         <div className="container">
//             <h2>My Recipes</h2>
//             <p>Your saved recipes will appear here.</p>
//         </div>
//     );
// };

// export default MyRecipes;
import React, { useState, useEffect } from "react";
import axios from "axios";

const MyRecipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/my-recipes", { withCredentials: true })
            .then(res => setRecipes(res.data))
            .catch(err => console.error("Error fetching recipes:", err));
    }, []);

    return (
        <div className="container">
            <h2>My Recipes</h2>
            <div className="recipe-grid">
                {recipes.map(recipe => (
                    <div key={recipe._id} className="recipe-card">
                        <img src={recipe.image} alt={recipe.title} />
                        <h3>{recipe.title}</h3>
                        <p><strong>Time:</strong> {recipe.time}</p>
                        <p>{recipe.ingredients}</p>
                        <p>{recipe.instructions}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyRecipes;

