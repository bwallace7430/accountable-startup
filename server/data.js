const userCollection = client.db('authTest').collection('user');
const entryCollection = client.db('authTest').collection('entry');

export async function getUser() {
    return userCollection.findOne({ username: username });
}

export async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    if (!(await getUser(username))) {
        const user = {
            username: username,
            password: passwordHash,
            token: generateAuthToken(),
            friends: []
        };
        await userCollection.insertOne(user);
    }
    else {
        throw new Error("Username already taken.");
    }
}

export async function createSession(username, password) {

    let user = await getUser(username);
    if (!user) {
        throw new Error("User not found");
    }
    let passwordHash = await bcrypt.hash(password, 10);
    if (!user.password === passwordHash) {
        throw new Error("Password is incorrect");
    }

    let authToken = generateAuthToken();
    userCollection.updateOne({ username: username }, { $set: { token: authToken } });

    return authToken;
}

function generateAuthToken() {
    return uuid.v4();
}

export async function createEntry(username, day, entry) {
    const newEntry = {
        username: username,
        date: day,
        entry: entry
    };
    return await entryCollection.insertOne(newEntry);
}

export async function getUserEntry(username, day) {
    return await entryCollection.findOne({ username: username, date: day });
}

export async function addFriend(username, friendUsername) {
    if (!await getUser(friendUsername)) {
        throw new Error("This user does not exist.");
    }
    return await userCollection.updateOne({ username: username }, { $push: { friends: friendUsername } });
}

export async function getFriends(username) {
    let user = await getUser(username);
    return user.friends;
}

export async function deleteSession(username) {
    return await userCollection.updateOne({ username: username }, { $set: { token: null } });
}