import React from 'react';
import { Link } from 'react-router-dom';
// import foodImage from '../../assets/food.jpg'; // Add a food image in assets folder

const Home = () => {
    return (
        <div>
            <div className="hero">
                <div className="hero-text">
                    <h1>Food Recipe</h1>
                    <p>
                        It is a long established fact that a reader will be distracted by the readable content of a page 
                        when looking at its layout.
                    </p>
                    <Link to="/add-recipe">
                        <button className="hero-button">Share your recipe</button>
                    </Link>
                </div>
                {/* <img src={foodImage} alt="Delicious food" /> */}
                <img src={require('../assets/food.jpg')} alt="Delicious food" />

            </div>
            {/* <img src="curved.svg" className="curved" alt="Design Curve" /> */}
        </div>
    );
};

export default Home;

// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Home = () => {
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         axios.get("http://localhost:3001/logout", { withCredentials: true })
//             .then(() => {
//                 navigate("/login"); // Redirect to login page after logout
//             })
//             .catch(err => console.error("Logout failed:", err));
//     };

//     return (
//         <div>
//             <nav className="navbar">
//                 <h2>Food Recipe</h2>
//                 <button onClick={handleLogout} className="logout-button">Logout</button>
//             </nav>

//             <div className="hero">
//                 <div className="hero-text">
//                     <h1>Food Recipe</h1>
//                     <p>
//                         It is a long established fact that a reader will be distracted by the readable content of a page 
//                         when looking at its layout.
//                     </p>
//                     <Link to="/add-recipe">
//                         <button className="hero-button">Share your recipe</button>
//                     </Link>
//                 </div>
//                 <img src={require("../assets/food.jpg")} alt="Delicious food" />
//             </div>
//         </div>
//     );
// };

// export default Home;
