import express from 'express';
import * as data from './data.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// configure the server
const server = express();
const PORT = process.argv.length > 2 ? process.argv[2] : 3000;

server.use(express.json());
server.use(express.static(path.join(__dirname, 'public')));

var apiRouter = express.Router();
server.use(`/api`, apiRouter);

function setAuthCookie(res, authToken) {
    res.cookie('token', authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

apiRouter.post('/users', (req, res) => {
    try {
        const { username, password } = req.body
        let user = data.createUser(username, password)
        setAuthCookie(res, user.authToken)
        res.status(200).json({ username })
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
        const { username, password } = req.body;
        // go through program and replace uses of userid
        let authToken = data.createSession(username, password);
        setAuthCookie(res, authToken);
        res.status(200).json({ username });
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