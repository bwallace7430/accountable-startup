import React from 'react';

function Friends() {

    return (
        <main>
            <section class="left_pane">
                <div class="friends_list">
                    <h3>My Friends</h3>
                    <ul id="friends">
                    </ul>
                </div>
            </section>
            <section class="right_pane">
                <div class="username">
                    <label for="username_input">
                        Find a friend
                    </label>
                    <input type="text" id="username_input" placeholder="username" />
                </div>
                <button onclick="createFriend()">Add Friend</button>
            </section>
        </main >
    );
};

export default Friends;