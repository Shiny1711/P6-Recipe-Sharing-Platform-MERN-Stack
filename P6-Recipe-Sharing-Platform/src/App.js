// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useState } from 'react';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import MyRecipes from './pages/MyRecipes';
// import AllRecipes from './pages/AllRecipes';
// import Login from './pages/Login';
// import AddRecipe from './pages/AddRecipe';
// import { Register } from './pages/Register';

// const App = () => {
//     const [recipes, setRecipes] = useState([]); // Store added recipes

//     const addRecipe = (newRecipe) => {
//         setRecipes([...recipes, newRecipe]); // Update recipes list
//     };
//     const deleteRecipe = (index) => {
//         setRecipes(recipes.filter((_, i) => i !== index)); // Remove the selected recipe
//     };

//     return (
//         <Router>
//             <Navbar />
//             <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/my-recipes" element={<MyRecipes />} />
//                 {/* <Route path="/all-recipes" element={<AllRecipes recipes={recipes} />} /> */}
//                 <Route path="/all-recipes" element={<AllRecipes recipes={recipes} deleteRecipe={deleteRecipe} />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<Register />} />
//                 <Route path="/add-recipe" element={<AddRecipe addRecipe={addRecipe} />} />
//             </Routes>
//         </Router>
//     );
// };

// export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MyRecipes from './pages/MyRecipes';
import AllRecipes from './pages/AllRecipes';
import Login from './pages/Login';
import AddRecipe from './pages/AddRecipe';
import { Register } from './pages/Register';

const App = () => {
    const [recipes, setRecipes] = useState([]);
    const [user, setUser] = useState(null); // Track logged-in user

    useEffect(() => {
        // Fetch user session when app loads
        axios.get("http://localhost:3001/user-session")
            .then(response => {
                if (response.data.user) {
                    setUser(response.data.user);
                }
            })
            .catch(error => console.error("Session fetch error:", error));
    }, []);

    const addRecipe = async (newRecipe) => {
        try {
            const response = await axios.post("http://localhost:3001/add-recipe", {
                ...newRecipe, 
                email: user?.email  // Attach logged-in user
            });
            setRecipes([...recipes, response.data]);
        } catch (error) {
            console.error("Error adding recipe:", error);
        }
    };

    const deleteRecipe = (index) => {
        setRecipes(recipes.filter((_, i) => i !== index));
    };

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:3001/logout");
            setUser(null);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <Router>
            <Navbar user={user} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/my-recipes" element={<MyRecipes recipes={recipes} user={user} />} />
                <Route path="/all-recipes" element={<AllRecipes recipes={recipes} deleteRecipe={deleteRecipe} />} />
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add-recipe" element={<AddRecipe addRecipe={addRecipe} />} />
            </Routes>
        </Router>
    );
};

export default App;

