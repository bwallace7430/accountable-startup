function login() {
    const username = document.getElementById('usernameInput').value;
    if (username === "") {
        window.alert("Please enter a username.")
        return
    }
    localStorage.setItem("username", username);
    window.location.href = "journal.html";
}
