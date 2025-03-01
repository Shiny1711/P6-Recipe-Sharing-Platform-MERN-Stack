
// // export default Login;
// import React, {  useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Login.css';

// const Login = () => {
    
//     const [email,setEmail]=useState();
//     const [password,setPassword]=useState();
//     const navigate=useNavigate();
//     const handleSubmit =  (e) => {
//         e.preventDefault();
//         axios.post("http://localhost:3001/login",{email,password})
//         .then(result =>
//         {
//             console.log(result)
//             if(result.data==="Success")
//             {
//                 navigate('/');
//             }
//         }
//         );


//     }
//     return (
//         <div className="login-container">
//             <div className="login-box">
//                 <h2>Login</h2>
//                 <form onSubmit={handleSubmit}>
//                     <input type="email" name="email" placeholder="Email" onChange={(e)=> setEmail(e.target.value)} required />
//                     <input type="password" name="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)} required />
//                     <button type="submit">Login</button>
//                 </form>
//                 <p onClick={() => navigate('/register')} className="toggle-text">
//                     Don't have an account? Register
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Login;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Login.css';

// const Login = ({ setUser }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:3001/login', { email, password });
//             if (response.data.success) {
//                 setUser(response.data.userEmail);
//                 navigate('/');
//             } else {
//                 alert("Invalid credentials. Try again.");
//             }
//         } catch (error) {
//             console.error("Login error:", error);
//             alert("Login failed.");
//         }
//     };

//     return (
//         <div className="login-container">
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
//                 <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', { email, password });
            if (response.data.success) {
                setUser(response.data.userEmail);
                navigate('/');
            } else {
                alert("Invalid credentials. Try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Login</button>
                </form>
                {/* Signup Button Added */}
                <button onClick={() => navigate('/register')} className="sign-up">
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default Login;

