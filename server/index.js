import express from 'express';
import * as data from './data.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();
const PORT = 8080;

server.use(express.json());
server.use(express.static(path.join(__dirname, 'public')));

var apiRouter = express.Router();
server.use(`/api`, apiRouter);

apiRouter.post('/users', (req, res) => {
    try {
        const { username, password } = req.body
        let userid = data.createUser(username, password)
        res.status(200).json({ userid })
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            message: "Username already taken."
        })
    }
});

apiRouter.post('/sessions', (req, res) => {
    try {
        const { username, password } = req.body
        let userid = data.createSession(username, password)
        res.status(200).json({ userid })
    }
    catch {
        res.status(400).json({
            message: "Invalid credentials."
        })
    }
});

apiRouter.post('/users/:userid/entries', (req, res) => {
    const { day, entry } = req.body
    const { userid } = req.params;
    data.createEntry(userid, day, entry)
    res.sendStatus(200)
});

apiRouter.get('/users/:userid/entries', (req, res) => {
    try {
        const { day } = req.query
        const { userid } = req.params
        let entry = data.getUserEntry(userid, day)
        res.status(200).json({ entry })
    }
    catch {
        res.status(400).json({
            message: "No entries found."
        })
    }
});

apiRouter.get('/users/:userid/friends', (req, res) => {
    try {
        const { userid } = req.params
        let friends = data.getFriends(userid)
        res.status(200).json({ friends })
    }
    catch {
        res.status(400).json({
            message: "No friends found."
        })
    }
});

apiRouter.post("/users/:userid/friends", (req, res) => {
    const { friendUsername } = req.body
    const { userid } = req.params
    data.addFriend(userid, friendUsername)
    res.sendStatus(200)
});

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