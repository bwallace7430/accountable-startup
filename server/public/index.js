async function login() {
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;

    if (username === "") {
        window.alert("Please enter a username.")
        return
    }
    if (password === "") {
        window.alert("Please enter a password.")
        return
    }
    let response = await fetch('/api/sessions', {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    if (response.ok) {
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
    if (password === "") {
        window.alert("Please enter a password.")
        return
    }

    try {
        let response = await fetch('/api/users', {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ username, password })
        })
        window.location.href = "journal.html";
    }
    catch {
        window.alert("Username already taken.")
    }
}
