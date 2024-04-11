import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (username === "") {
            alert("Please enter a username.");
            return;
        }
        if (password === "") {
            alert("Please enter a password.");
            return;
        }
        let response = await fetch('/api/sessions', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        if (response.ok) {
            navigate('/journal');
        }
        else {
            alert("Invalid credentials.");
        }
    }

    const handleCreateUser = async () => {
        if (username === "") {
            alert("Please enter a username.");
            return;
        }
        if (password === "") {
            alert("Please enter a password.");
            return;
        }
        try {
            let response = await fetch('/api/users', {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ username, password })
            })
            navigate('/journal');
        }
        catch {
            alert("Username already taken.");
        }
    }

    return (
        <main className="logInMain">
            <h1 className="logInH1">
                Log In
            </h1>
            <div className="logInFields">
                <div className="inputBox">
                    <input type="text" id="usernameInput" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="inputBox">
                    <label htmlFor="passwordInput">
                        Password:
                    </label>
                    <input type="password" id="passwordInput" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            <div className="logInButtons">
                <button onClick={handleCreateUser}>Create User</button>
                <button onClick={handleLogin}>Log In</button>
            </div>
            <hr />
        </main>
    );
};

export default Login;