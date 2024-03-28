import express from 'express';
import * as data from './data.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser'
import { serverSideWebSocket, notifyFollowers } from './webSocket.js'

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

apiRouter.post('/users', async (req, res) => {
    try {
        const { username, password } = req.body;
        let user = await data.createUser(username, password);
        setAuthCookie(res, user.token);
        res.status(200).json({ username });
    }
    catch (e) {
        res.status(400).json({
            message: "Username already taken."
        })
    }
});

apiRouter.post('/sessions', async (req, res) => {
    try {
        const { username, password } = req.body;
        let authToken = await data.createSession(username, password);
        setAuthCookie(res, authToken);
        res.status(200).json({ username });
    }
    catch {
        res.status(400).json({
            message: "Invalid credentials."
        })
    }
});

apiRouter.use(async (req, res, next) => {
    let authToken = req.cookies['token'];
    let user = await data.getUserByAuthToken(authToken);
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

apiRouter.post('/my/entries', async (req, res) => {
    let user = req.user;
    const { day, entry } = req.body;
    await data.createEntry(user.username, day, entry);
    notifyFollowers(user.username);
    console.log("in the post request. followers have been notified");
    res.sendStatus(200);
});

apiRouter.get('/my/entries', async (req, res) => {
    let user = req.user;
    const { day } = req.query;
    let entry = await data.getUserEntry(user.username, day);
    res.status(200).json({ entry });
});

apiRouter.get('/my/friends', async (req, res) => {
    let user = req.user;
    let friends = await data.getFriends(user.username);
    res.status(200).json({ friends });
});

apiRouter.post("/my/friends", async (req, res) => {
    let user = req.user
    const { friendUsername } = req.body
    try {
        await data.addFriend(user.username, friendUsername)
        res.sendStatus(200)
    }
    catch {
        res.status(400).json({ message: "User does not exist." })
        return;
    }
});

// Start the server
const service = server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//ENDPOINTS:
// POST createUSER
// POST log in user
// POST create journal entry
// GET read a journal entry
// GET list of friends
// POST add a friend

serverSideWebSocket(service);