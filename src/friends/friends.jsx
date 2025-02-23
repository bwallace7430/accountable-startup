import React, { useEffect, useState } from 'react';
import './friends.css';
import ActivityIndicator from './activityIndicator';

function Friends() {

    const [user, setUser] = useState()
    const [friendList, setFriendList] = useState([])
    const [friendName, setFriendName] = useState("")

    useEffect(() => {
        setupPage();
    }, []);

    useEffect(() => {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        const socket = new WebSocket(`${protocol}://localhost:3000/ws`)
        //const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

        socket.onopen = () => {
            const authToken = document.cookie.split("=")[1];
            socket.send(authToken);
        };

        socket.onmessage = (event) => {
            editFriendList(event.data, true);
        };

        return () => {
            socket.close();
        };
    }, []);

    async function setupPage() {
        await loadUser();
        createList();
    }

    async function loadUser() {
        let response = await fetch("/api/users/me");
        setUser((await response.json()).user);
    }

    async function createList() {
        let response = await fetch(`/api/my/friends`);
        if (!response.ok) {
            return;
        }
        let { friends_activity } = await response.json();
        for (let friend of friends_activity) {
            editFriendList(friend.username, friend.active);
        }
    }

    function editFriendList(friend, hasWritten) {
        let friends = [...friendList];

        const foundFriend = friendList.find((e) => e.friend === friend);
        if (foundFriend) {
            foundFriend.hasWritten = hasWritten;
        }
        else {
            friends.push({ friend, hasWritten });
        }
        setFriendList(friends);
    }

    function displayFriendList(friendList) {
        let list = [];
        for (let friend of friendList) {
            let listItem = (<ActivityIndicator key={friend} friend={friend.friend} hasWritten={friend.hasWritten}></ActivityIndicator>);
            list.push(listItem);
        }
        return list;
    }

    async function createFriend() {
        let response = await fetch(`/api/my/friends`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ friendName })
        })
        if (response.ok) {
            let { friends_activity } = await response.json();
            addFriendToDisplay(friendName, friends_activity[0].active);
        }
        else {
            alert("That friend does not exist.");
        }
    }

    return (
        <main>
            <section className="left_pane">
                <div className="friends_list">
                    <h3>My Friends</h3>
                    <ul id="friends">
                        {displayFriendList(friendList)}
                    </ul>
                </div>
            </section>
            <section className="right_pane">
                <div className="username">
                    <label htmlFor="username_input">
                        Find a friend
                    </label>
                    <input type="text" id="username_input" placeholder="username" value={friendName} onChange={(e) => setFriendName(e.target.value)} />
                </div>
                <button onClick={createFriend}>Add Friend</button>
            </section>
        </main >
    );
};

export default Friends;