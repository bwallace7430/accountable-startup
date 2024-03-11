const express = require('express')
const server = express();
const PORT = 8080;

server.use((req, res, next) => {
    console.log(req.path);
    next();
})

// Define routes
server.get('/', (req, res) => {
    res.send('Hello World!');
});

server.get('/bkhgh', (req, res) => {
    res.send("Why are you getching this?")
})

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});