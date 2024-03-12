async function login() {
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;

    if (username === "") {
        window.alert("Please enter a username.")
        return
    }
    let response = await fetch('/api/sessions', {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    if (response.ok) {
        let { userid } = await response.json();

        localStorage.setItem("username", username);
        localStorage.setItem("userid", userid);

        window.location.href = "journal.html";
    }
    else {
        window.alert("Invalid credentials.")
    }
}

async function createUser() {
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;

    if (username === "") {
        window.alert("Please enter a username.")
        return
    }

    try {
        let response = await fetch('/api/users', {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ username, password })
        })

        let { userid } = await response.json()
        localStorage.setItem("username", username);
        localStorage.setItem("userid", userid);

        window.location.href = "journal.html";
    }
    catch {
        window.alert("Username already taken.")
    }
}
