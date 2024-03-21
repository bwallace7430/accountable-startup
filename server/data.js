const users = [];
const entries = {};
const friends = {};

const userCollection = client.db('authTest').collection('user');
const entryCollection = client.db('authTest').collection('entry');
const friendCollection = client.db('authTest').collection('friend');

export async function getUser() {
    return userCollection.findOne({ username: username });
}

export async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    if (!(await getUser(username))) {
        const user = {
            username: username,
            password: passwordHash,
            token: generateAuthToken()
        };
        await userCollection.insertOne(user);
    }
    else {
        throw new Error("Username already taken.")
    }
}

export async function createSession(username, password) {

    let user = await getUser(username)
    if (!user) {
        throw new Error("User not found")
    }
    let passwordHash = await bcrypt.hash(password, 10);
    if (!user.password === passwordHash) {
        throw new Error("Password is incorrect")
    }

    let authToken = generateAuthToken();
    userCollection.updateOne({ username: username }, { $set: { token: authToken } })
    user = await getUser(username)
    return user.authToken;
}

function generateAuthToken() {
    return uuid.v4()
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
    allFriends.push(friendUsername)
}

export function getFriends(userId) {
    if (!friends[userId]) {
        throw new Error("User has no friends")
    }
    return friends[userId]
}