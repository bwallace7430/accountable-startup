addEventListener("load", setupPage);

function setupPage() {
    displayUserName();
    if (localStorage.getItem("friendsList") === null) {
        localStorage.setItem("friendsList", JSON.stringify(["Imhotep", "Lord Scotland", "Abraham Lincoln", "Rhianna", "Oliver", "Esme", "My Favorite TA"]));
    }
    displayList();
}

function displayUserName() {
    document.querySelector('#users_journal_tag').innerHTML = localStorage.getItem("username") + "'s Journal"
}

async function displayList() {
    let response = await fetch(`/api/my/friends`)
    if (!response.ok) {
        return
    }
    let { friends } = await response.json();
    for (let friend of friends) {
        addFriendToDisplay(friend)
    }
}

function addFriendToDisplay(friend) {
    let li = document.querySelector('#friends').appendChild(document.createElement("li"));
    let span = li.appendChild(document.createElement("span"));
    span.className = "friend_activity_indicator inactive";
    let p = li.appendChild(document.createElement('p'));
    p.innerHTML = friend;
}

async function createFriend() {
    let friendUsername = document.getElementById('username_input').value;

    await fetch(`/api/my/friends`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ friendUsername })
    })

    addFriendToDisplay(friendUsername);
}

setInterval(() => {
    let inactiveFriends = document.querySelectorAll('.inactive');
    if (inactiveFriends.length === 0) { return; }
    let randomInactive = inactiveFriends.item(Math.random() * inactiveFriends.length);
    randomInactive.className = "friend_activity_indicator active";
}, 5000);