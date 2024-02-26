function login() {
    const email = document.getElementById('emailInput').value;
    localStorage.setItem("email", email);
    window.location.href = "journal.html";
}
