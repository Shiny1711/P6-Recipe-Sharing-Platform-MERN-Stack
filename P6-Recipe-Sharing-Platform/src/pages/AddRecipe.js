
// export default AddRecipe;
import React, { useState } from "react";
import axios from "axios";
import "./AddRecipe.css";

const AddRecipe = () => {
    const [recipe, setRecipe] = useState({
        title: "",
        time: "",
        ingredients: "",
        instructions: "",
        image: "",
    });

    const handleChange = (e) => {
        setRecipe({ ...recipe, [e.target.name]: e.target.value });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await axios.post("http://localhost:3001/add-recipe", recipe);
    //         alert("Recipe added successfully!");
    //         setRecipe({
    //             title: "",
    //             time: "",
    //             ingredients: "",
    //             instructions: "",
    //             image: "",
    //         });
    //     } catch (error) {
    //         console.error("Error adding recipe:", error);
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Sending recipe data:", recipe); // Debugging log
    
            const response = await axios.post("http://localhost:3001/add-recipe", recipe);
            
            console.log("Response from server:", response.data); // Debugging log
    
            alert("Recipe added successfully!");
            setRecipe({
                title: "",
                time: "",
                ingredients: "",
                instructions: "",
                image: "",
            });
        } catch (error) {
            console.error("Error adding recipe:", error);
            alert("Failed to add recipe.");
        }
    };
    

    return (
        <div className="container1">
            <h2>Add Your Recipe</h2>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" name="title" value={recipe.title} onChange={handleChange} required />

                <label>Time</label>
                <input type="text" name="time" value={recipe.time} onChange={handleChange} required />

                <label>Ingredients</label>
                <textarea name="ingredients" value={recipe.ingredients} onChange={handleChange} required></textarea>

                <label>Instructions</label>
                <textarea name="instructions" value={recipe.instructions} onChange={handleChange} required></textarea>

                <label>Image URL</label>
                <input type="text" name="image" value={recipe.image} onChange={handleChange} />

                <button type="submit">Add Recipe</button>
            </form>
        </div>
    );
};

export default AddRecipe;

