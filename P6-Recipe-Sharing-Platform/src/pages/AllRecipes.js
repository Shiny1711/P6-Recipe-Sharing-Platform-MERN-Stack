
// export default AllRecipes;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllRecipes.css";

const AllRecipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/all-recipes")
            .then(res => setRecipes(res.data))
            .catch(err => console.error("Error fetching recipes:", err));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/delete-recipe/${id}`);
            setRecipes(recipes.filter(recipe => recipe._id !== id));
        } catch (error) {
            console.error("Error deleting recipe:", error);
        }
    };

    return (
        <div className="container">
            <h2>All Recipes</h2>
            <div className="recipe-grid">
                {recipes.map(recipe => (
                    <div key={recipe._id} className="recipe-card">
                        <img src={recipe.image} alt={recipe.title} />
                        <h3>{recipe.title}</h3>
                        <p><strong>Time:</strong> {recipe.time}</p>
                        <button onClick={() => handleDelete(recipe._id)}>Delete</button>
                        <button onClick={() => alert(`Details: ${recipe.ingredients} \n\n ${recipe.instructions}`)}>View Details</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllRecipes;


