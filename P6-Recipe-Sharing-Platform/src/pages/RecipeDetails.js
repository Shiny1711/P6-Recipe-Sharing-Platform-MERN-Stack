import React from "react";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
    const { id } = useParams();

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Recipe Details</h2>
            <p>Showing details for recipe ID: {id}</p>
        </div>
    );
};

export default RecipeDetails;
