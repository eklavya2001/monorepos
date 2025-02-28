import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useSetRecoilState} from "recoil";
import {authState} from "../store/authState.js";

//the problem statement is that when a frontend dev , works on this he doesn't know what type of input data is to be sent to the backend,
// the purpose is to get the type of data to be sent to the backend that backend actually takes through zod validation, 
// but how? using zod inference ,
// abe backend ka auth.ts khol , udhar zod validation wala data dikhega , now hum chahte ha ki frontend ko data usi hisab se bhejna ha ye pata chal jaaye ,
// to ye kaise hoga ya to type se hoga ya interface se hoga
// so we make a common package or modules folder in which we keep all the code which can be commonly used by frontend and backend


const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        const response = await fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        // Todo: Create a type for the response that you get back from the server
        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token)
            window.location = "/todos";
        } else {
            alert("Error while signing up");
        }
    };

    return (
        <div style={{justifyContent: "center", display: "flex", width: "100%"}}>
            <div>
                <h2>Signup</h2>
                <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                Already signed up? <Link to="/login">Login</Link>
                <button onClick={handleSignup}>Signup</button>
            </div>
        </div>
    );
};

export default Signup;
