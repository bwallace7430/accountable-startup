import React from 'react';

function Login() {

    return (
        <main>
            <h1>
                Log In
            </h1>
            <div class="logInFields">
                <div class="inputBox">
                    <input type="text" id="usernameInput" placeholder="Username" />
                </div>
                <div class="inputBox">
                    <label for="passwordInput">
                        Password:
                    </label>
                    <input type="password" id="passwordInput" placeholder="Password" />
                </div>
            </div>
            <div class="logInButtons">
                <button onclick="createUser()">Create User</button>
                <button onclick="login()">Log In</button>
            </div>
            <hr />
        </main>
    );
};

export default Login;