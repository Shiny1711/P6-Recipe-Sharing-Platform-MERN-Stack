// const express = require("express");
// const mongoose = require('mongoose');
// const cors = require("cors");
// const EmployeeModel = require('./models/User');
// const RecipeModel = require('./models/Recipe'); // Import Recipe Model

// const app = express();
// app.use(express.json());
// app.use(cors());


// mongoose.connect("mongodb://localhost:27017/recipeDB")
//     .then(() => console.log("Connected to MongoDB"))
//     .catch(err => console.error("MongoDB Connection Error:", err));
// // Register User
// app.post("/register", (req, res) => {
//     EmployeeModel.create(req.body)
//         .then(user => res.json(user))
//         .catch(err => res.json(err));
// });

// const session = require('express-session');
// const MongoStore = require('connect-mongo');

// app.use(session({
//     secret: 'yourSecretKey', // Change this to a strong secret key
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//         mongoUrl: 'mongodb://localhost:27017/yourDatabaseName', // Change to your MongoDB URL
//         collectionName: 'sessions'
//     }),
//     cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 1-day session
// }));


// app.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     const user = await UserModel.findOne({ email });

//     if (!user || user.password !== password) {
//         return res.status(401).json({ message: "Invalid credentials" });
//     }

//     req.session.userEmail = user.email; // Store user email in session
//     res.json({ message: "Success", userEmail: user.email });
// });
// //logout
// app.get("/logout", (req, res) => {
//     req.session.destroy(err => {
//         if (err) return res.status(500).json({ message: "Logout failed" });
//         res.json({ message: "Logged out successfully" });
//     });
// });

// // Add Recipe
// // app.post("/add-recipe", (req, res) => {
// //     RecipeModel.create(req.body)
// //         .then(recipe => res.json(recipe))
// //         .catch(err => res.json(err));
// // });
// app.post("/add-recipe", (req, res) => {
//     if (!req.session.userEmail) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }

//     const newRecipe = new RecipeModel({
//         ...req.body,
//         userEmail: req.session.userEmail // Store the user's email from session
//     });

//     newRecipe.save()
//         .then(() => res.json({ message: "Recipe added successfully" }))
//         .catch(err => res.status(500).json({ error: err.message }));
// });


// // Get All Recipes
// app.get("/all-recipes", (req, res) => {
//     RecipeModel.find()
//         .then(recipes => res.json(recipes))
//         .catch(err => res.json(err));
// });

// // Delete Recipe
// app.delete("/delete-recipe/:id", (req, res) => {
//     RecipeModel.findByIdAndDelete(req.params.id)
//         .then(() => res.json("Recipe Deleted"))
//         .catch(err => res.json(err));
// });

// app.listen(3001, () => {
//     console.log("Server is running on port 3001");
// });
const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcryptjs');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const EmployeeModel = require('./models/User'); // User model
const RecipeModel = require('./models/Recipe'); // Recipe model

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" })); // CORS for frontend

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/recipeDB")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB Connection Error:", err));

// Session Middleware
app.use(session({
    secret: 'yourSecretKey', 
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/recipeDB', // Use correct DB name
        collectionName: 'sessions'
    }),
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 1-day session
}));

// Register User with Password Hashing
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Hash password

        const newUser = new EmployeeModel({ name, email, password: hashedPassword });
        await newUser.save();
        res.json({ success: true, message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Login User with Password Validation
// app.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await EmployeeModel.findOne({ email });

//         if (!user || !(await bcrypt.compare(password, user.password))) {
//             return res.status(401).json({ message: "Invalid credentials" });
//         }

//         req.session.userEmail = user.email; // Store user email in session
//         res.json({ success: true, message: "Login successful", userEmail: user.email });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await EmployeeModel.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        req.session.userEmail = user.email; // Store user email in session
        res.json({ success: true, message: "Login successful", userEmail: user.email });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


// Logout
app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: "Logout failed" });
        res.json({ message: "Logged out successfully" });
    });
});

// Add Recipe (Authenticated)
// app.post("/add-recipe", async (req, res) => {
//     if (!req.session.userEmail) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }

//     try {
//         const newRecipe = new RecipeModel({
//             ...req.body,
//             userEmail: req.session.userEmail // Store the user's email from session
//         });

//         await newRecipe.save();
//         res.json({ message: "Recipe added successfully" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });
app.post("/add-recipe", async (req, res) => {
    try {
        const newRecipe = new RecipeModel({
            ...req.body
        });

        await newRecipe.save();
        res.json({ message: "Recipe added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Recipes
app.get("/all-recipes", async (req, res) => {
    try {
        const recipes = await RecipeModel.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Recipe
app.delete("/delete-recipe/:id", async (req, res) => {
    try {
        await RecipeModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Recipe Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
