// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Login.css';
// import { useState } from 'react';

// export const Register = () => {


//     const [name,setName]=useState();
//     const [email,setEmail]=useState();
//     const [password,setPassword]=useState();
//         const navigate = useNavigate();
    
    
//     const handleSubmit = (e) =>
//     {
//         e.preventDefault();
//         axios.post('http://localhost:3001/register',{name, email, password})
//             .then(result=> { console.log(result)
//             navigate('/login') })
//             .catch((err)=> console.log(err))
            

        
//     };
       
//   return (
//     <div className="login-container">
//     <div className="login-box">
//         <h2>Register</h2>
//         <form onSubmit={handleSubmit}>
//             <input type="text" name="email" placeholder="Username" onChange={(e)=>setName(e.target.value)} required />
//             <input type="email" name="email" placeholder="Email"  onChange={(e)=>setEmail(e.target.value)} required />
//             <input type="password" name="password" placeholder="Password"  onChange ={(e)=>setPassword(e.target.value)} required />
//             <button type="submit">Register</button>
//         </form>
//         <button onClick={()=>navigate('/login')} className='log'>
//             Login
//         </button>
//     </div>
// </div>
//   )
// }
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { useState } from 'react';

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/register', { name, email, password });
            if (response.data.success) {
                alert("Registration successful! Please login.");
                navigate('/login');
            } else {
                alert("Registration failed. Try again.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("Error registering user.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
                    <input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Register</button>
                </form>
                <button onClick={() => navigate('/login')} className='log'>
                    Login
                </button>
            </div>
        </div>
    );
};

