import React from 'react';
import './login.css';

function Login() {

    return (
        <main className="logInMain">
            <h1 className="logInH1">
                Log In
            </h1>
            <div className="logInFields">
                <div className="inputBox">
                    <input type="text" id="usernameInput" placeholder="Username" />
                </div>
                <div className="inputBox">
                    <label htmlFor="passwordInput">
                        Password:
                    </label>
                    <input type="password" id="passwordInput" placeholder="Password" />
                </div>
            </div>
            <div className="logInButtons">
                <button onClick="createUser()">Create User</button>
                <button onClick="login()">Log In</button>
            </div>
            <hr />
        </main>
    );
};

export default Login;