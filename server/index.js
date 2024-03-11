const express = require('express')
const server = express();
const PORT = 8080;

server.use(express.static('public'));

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});