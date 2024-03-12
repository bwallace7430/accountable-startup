const users = [];
const authTokens = [];
const entries = {};
const friends = {};
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

export function createEntry(userId, day, entry) {
    if (!entries[userId]) {
        entries[userId] = {}
    }
    let allEntries = entries[userId]
    allEntries[day] = entry;
}

export function getUserEntry(userId, day) {
    if (!entries[userId]) {
        throw new Error("User has no entries")
    }
    if (!entries[userId][day]) {
        throw new Error("Day has no entry")
    }
    return entries[userId][day]
}

export function addFriend(userId, friendUsername) {
    if (!friends[userId]) {
        friends[userId] = []
    }
    let allFriends = friends[userId]
    allFriends[userId].append(friendUsername)
}

export function getFriends(userId) {
    if (!friends[userId]) {
        throw new Error("User has no friends")
    }
    return friends[userId]
}