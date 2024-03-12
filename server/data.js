const users = [];
const authTokens = [];
const entries = {};
let idCounter = 0;

export function createUser(username, password) {
    idCounter += 1;
    if (!users.find((user) => user.username === username)) {
        users.push({ userId: idCounter, username: username, password: password });
    }
    else {
        throw new Error("Username already taken.")
    }
}

export function createSession(username, password) {
    let user = users.find((user) => user.username === username)
    if (!user) {
        throw new Error("User not found")
    }
    if (!user.password === password) {
        throw new Error("Password is incorrect")
    }
    let authToken = generateAuthToken()
    authTokens.push({ username: username, authToken: authToken });
    return authToken
}

export function createEntry(username, day, entry) {
    let allEntries = entries[username]
    allEntries.push({ day: day, entry: entry });
}