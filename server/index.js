const express = require('express')
import * as data from './data';
const server = express();
const PORT = 8080;

server.use(express.json());

var apiRouter = express.Router();
server.use(`/api`, apiRouter);

server.post('/users', (req, res) => {
    try {
        const { username, password } = req.body
        data.createUser(username, password)
        res.sendStatus(200)
    }
    catch {
        res.status(400).json({
            message: "Username already taken."
        })
    }
});

server.post('/sessions', (req, res) => {
    try {
        const { username, password } = req.body
        let authToken = data.createSession(username, password)
        res.status(200).json({ token: authToken })
    }
    catch {
        res.status(400).json({
            message: "Invalid credentials."
        })
    }
});

server.post('/users/:userid/entries', (req, res) => {
    const { username, day, entry } = req.body
    data.createEntry(username, day, entry)
    res.status(200)
});

server.get('/users/:userid/entries', (req, res) => {
    data.getUserEntries(userid, day, entry)
    res.status(200)
});

server.get('/users/:userid/friends', (req, res) => {
    data.getFriends(userid, friends)
    res.status(200)
});

server.post("/users/:userid/friends", (req, res) => {
    data.createFriend(userid, friends)
    res.status(200)
});

server.use(express.static('public'));

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//ENDPOINTS:
// POST createUSER
// POST log in user
// POST create journal entry
// GET read a journal entry
// GET list of friends
// POST add a friend