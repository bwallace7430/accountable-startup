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

function displayList() {
    let friendsList = JSON.parse(localStorage.getItem("friendsList"));
    for (let friend of friendsList) {
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

function createFriend() {
    let friendsList = JSON.parse(localStorage.getItem("friendsList"));
    let newFriend = document.getElementById('username_input').value;
    friendsList.push(newFriend);
    localStorage.setItem("friendsList", JSON.stringify(friendsList));
    addFriendToDisplay(newFriend);
}

setInterval(() => {
    let inactiveFriends = document.querySelectorAll('.inactive');
    if (inactiveFriends.length === 0) { return; }
    let randomInactive = inactiveFriends.item(Math.random() * inactiveFriends.length);
    randomInactive.className = "friend_activity_indicator active";
}, 5000);