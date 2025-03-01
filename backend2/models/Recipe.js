const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title: String,
    time: String,
    ingredients: String,
    instructions: String,
    image: String, // Store image URL
});

const RecipeModel = mongoose.model("recipe", RecipeSchema);
module.exports = RecipeModel;
