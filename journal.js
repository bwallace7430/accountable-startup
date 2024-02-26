addEventListener("load", display_user_name);

function display_user_name() {
    document.querySelector('#users_journal_tag').innerHTML = localStorage.getItem("username") + "'s Journal"
}