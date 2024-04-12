addEventListener("load", setupPage);
let user = null;

async function setupPage() {
    await loadUser();
    configureWebSocket();
    displayUserName();
    displayList();
}

async function loadUser() {
    let response = await fetch("/api/users/me");
    user = (await response.json()).user;
}

function displayUserName() {
    document.querySelector('#users_journal_tag').innerHTML = user.username + "'s Journal";
}

async function displayList() {
    let response = await fetch(`/api/my/friends`)
    if (!response.ok) {
        return
    }
    let { friends_activity } = await response.json();
    for (let friend of friends_activity) {
        addFriendToDisplay(friend.username, friend.active)
    }
}

function addFriendToDisplay(friend, hasWritten) {
    let li = document.querySelector('#friends').appendChild(document.createElement("li"));
    let span = li.appendChild(document.createElement("span"));
    if (hasWritten == true) {
        span.className = "friend_activity_indicator active";
    }
    else {
        span.className = "friend_activity_indicator inactive";
    }
    span.dataset.username = friend;
    let p = li.appendChild(document.createElement('p'));
    p.innerHTML = friend;
}

async function createFriend() {
    let friendUsername = document.getElementById('username_input').value;
    let response = await fetch(`/api/my/friends`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ friendUsername })
    })
    if (response.ok) {
        let { friends_activity } = await response.json();
        addFriendToDisplay(friendUsername, friends_activity[0].active);
    }
    else {
        window.alert("That friend does not exist.");
    }
}

function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    this.socket.onopen = () => {
        /*  "token=futftif67f679697f9;" */
        authToken = document.cookie.split("=")[1];
        this.socket.send(authToken)
    };
    this.socket.onmessage = async (event) => {
        let activeUser = event.data;
        document.querySelector("[data-username=" + activeUser + "]").className = "friend_activity_indicator active";
    };
}