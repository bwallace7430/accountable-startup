const month_nums = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
}

addEventListener("load", setup_page);

function setup_page() {
    display_user_name();
    display_calendar();
}

function display_user_name() {
    document.querySelector('#users_journal_tag').innerHTML = localStorage.getItem("username") + "'s Journal"
}

function load_journal_entry(day) {
    let date = day.getDate();
    localStorage.getItem(date);
    day.className = "active";
}

function display_calendar() {
    let curr_date = new Date();
    let curr_month = month_nums[curr_date.getMonth()]
    let first_date = new Date();
    first_date.setDate(1);
    document.querySelector('#month_name').innerHTML = curr_month
    for (let i = 0; i < first_date.getDay(); i++) {
        document.querySelector('#dates_of_month').appendChild(document.createElement("li"));
    }
    let last_date = new Date(curr_date.getFullYear(), curr_date.getMonth() + 1, 0).getDate()
    for (let i = 0; i < last_date - 1; i++) {
        let day = document.createElement("a");
        day.href = "#";
        day.onclick = () => load_journal_entry(this)
        if (i + 1 == curr_date.getDate()) {
            day.className = "active";
        }
        day.innerHTML = i + 1;
        document.querySelector('#dates_of_month').appendChild(day);
    }

}


//when page loads get current date. use to build out calendar (add children to grid container based on current month)