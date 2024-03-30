import { WebSocketServer } from 'ws';
import * as uuid from 'uuid';
import { getFollowers, getUserByAuthToken } from './data.js';
import e from 'express';

let connections = [];

export function serverSideWebSocket(httpServer) {
    const wss = new WebSocketServer({ noServer: true });

    httpServer.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
        });
    });

    wss.on('connection', async (ws, request) => {
        const authToken = request.headers.cookie.split("=")[1];

        let user = await getUserByAuthToken(authToken);
        let username = user.username;
        const connection = { id: uuid.v4(), alive: true, ws: ws, username: username };
        connections.push(connection);

        ws.on('message', (message) => {

        })
        // get the data out of the websocket message (username of person connected)
        // find websocket in connection array
        // add the username to the connection in the connection array

        // Remove the closed connection so we don't try to forward anymore
        ws.on('close', () => {
            const pos = connections.findIndex((o, i) => o.id === connection.id);

            if (pos >= 0) {
                connections.splice(pos, 1);
            }
        });
        // Respond to pong messages by marking the connection alive
        ws.on('pong', () => {
            connection.alive = true;
        });
    });

    // Keep active connections alive
    setInterval(() => {
        connections.forEach((c) => {
            // Kill any connection that didn't respond to the ping last time
            if (!c.alive) {
                c.ws.terminate();
            } else {
                c.alive = false;
                c.ws.ping();
            }
        });
    }, 10000);
}

export async function notifyFollowers(username) {
    console.log("username is: " + username);
    let followers = await getFollowers(username);
    let followerUsernames = followers.map((follower) => follower.username);
    console.log("all followers: ");
    console.log(followerUsernames);
    // find all users that follow User

    console.log("all connections: ");
    console.log(connections);
    connections.forEach((connection) => {
        if (followerUsernames.includes(connection.username)) {
            connection.ws.send(username);
            console.log("follower has been notified.");
        }
    })
    // get all connections that belong to users^^
    // loop through sockets and send a message to all users^^
}

//TO DO : when User logs on, get the "written" status of all User's friends. remove console.logs()