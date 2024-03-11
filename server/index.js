const express = require('express')
const server = express();
const PORT = 8080;

server.use(express.static('public'));

server.post("/users")
server.post("/sessions")
server.post("/users/:userid/entries")
server.get("/users/:userid/entries")
server.get("/users/:userid/friends")
server.post("/users/:userid/friends")

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