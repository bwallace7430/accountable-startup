import * as uuid from 'uuid';
import bcrypt from 'bcrypt';
import { createRequire } from "module";
import { MongoClient } from 'mongodb';
const require = createRequire(import.meta.url);
const config = require("./dbConfig.json");

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('accountable');

(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
})().catch((ex) => {
    process.exit(1);
});

const userCollection = client.db('authTest').collection('user');
const entryCollection = client.db('authTest').collection('entry');

export async function getUser(username) {
    return userCollection.findOne({ username: username });
}

export async function getUserByAuthToken(authToken) {
    let user = await userCollection.findOne({ token: authToken });
    return user;
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
        return user;
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
    if (!await bcrypt.compare(password, user.password)) {
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
    return await entryCollection.updateOne({ username: username, date: day }, { $set: newEntry }, { upsert: true });
}

export async function getUserEntry(username, day) {
    return await entryCollection.findOne({ username: username, date: day });
}

export async function addFriend(username, friendUsername) {
    if (!await getUser(friendUsername)) {
        throw new Error("This user does not exist.");
    }
    await userCollection.updateOne({ username: username }, { $push: { friends: friendUsername } });
    return await getFriendsWrittenStatus([friendUsername], (new Date()).toDateString());
}

export async function getFriends(username) {
    let user = await getUser(username);
    return user.friends;
}

export async function getFriendsWrittenStatus(friends, day) {
    let friends_activity = []
    for (let friend of friends) {
        let friend_data = { username: friend, active: !!(await getUserEntry(friend, day)) };
        friends_activity.push(friend_data);
    }
    return friends_activity
}

export async function getFollowers(username) {
    return (await userCollection.find({ friends: username })).toArray();
}

export async function deleteSession(username) {
    return await userCollection.updateOne({ username: username }, { $set: { token: null } });
}