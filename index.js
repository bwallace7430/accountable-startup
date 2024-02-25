function createUser() {
    email = document.getElementById("emailInput");
    password = document.getElementById("passwordInput");
    all_users = localStorage.getItem("Users")
    let user = { email: email, password: password }
}