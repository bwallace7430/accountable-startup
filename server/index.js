import express from 'express';
import * as data from './data.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// configure the server
const server = express();
const PORT = process.argv.length > 2 ? process.argv[2] : 3000;

server.use(express.json());
server.use(cookieParser());
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

apiRouter.use((req, res, next) => {
    authToken = req.cookies['token'];
    let user = data.getUserByAuthToken(authToken);
    if (!user) {
        res.status(401).json({ message: "Unauthorized" })
        return;
    }
    req.user = user;
    next();
});

apiRouter.get('/users/me', (req, res) => {
    let user = req.user;
    res.status(200).json({ user })
});

apiRouter.post('/my/entries', (req, res) => {
    let user = req.user;
    const { day, entry } = req.body
    data.createEntry(user.username, day, entry)
    res.sendStatus(200)
});

apiRouter.get('/my/entries', (req, res) => {
    let user = req.user;
    const { day } = req.query
    let entry = data.getUserEntry(user.username, day)
    res.status(200).json({ entry })
});

apiRouter.get('/my/friends', (req, res) => {
    let user = req.user;
    let friends = data.getFriends(user.username);
    res.status(200).json({ friends });
});

apiRouter.post("/my/friends", (req, res) => {
    let user = req.user
    const { friendUsername } = req.body
    try {
        data.addFriend(user.username, friendUsername)
        res.sendStatus(200)
    }
    catch {
        res.status(400).json({ message: "User does not exist." })
        return;
    }
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