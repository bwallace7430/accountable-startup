const monthNums = {
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

let activeDate = new Date();
addEventListener("load", setupPage);

function setupPage() {
    displayUserName();
    displayCalendar(new Date(activeDate.getFullYear(), activeDate.getMonth(), 1));
    if (localStorage.getItem(activeDate.toDateString) == null) {
        localStorage.setItem(activeDate.toDateString(), "This is an example journal entry. Feel free to replace it!");
    }
    twelfth = (new Date(activeDate.getFullYear(), activeDate.getMonth(), 12)).toDateString();
    if (localStorage.getItem(twelfth) === null) {
        localStorage.setItem(twelfth, "Today I worked on my CS 260 project. It is so so so good! Like really above expectations, truly. The TAs are so so so impressed! In fact they're so impressed that they were just about to give me a 100%... right? ;)");
    }
    lastMonth = (new Date(activeDate.getFullYear(), activeDate.getMonth() - 1, 5)).toDateString();
    if (localStorage.getItem(lastMonth) === null) {
        localStorage.setItem(lastMonth, "Never gonna give you up, never gonna let you down, never gonna run around and desert you.");
    }
    loadJournalEntry(activeDate);
}

function displayUserName() {
    document.querySelector('#users_journal_tag').innerHTML = localStorage.getItem("username") + "'s Journal"
}

function loadJournalEntry(date) {
    console.log(date);
    let entry = localStorage.getItem(date.toDateString());
    document.getElementById('journalEntry').value = entry;
}

function displayCalendar(date) {
    let currDate = new Date();
    let activeMonth = monthNums[activeDate.getMonth()];
    let firstDate = new Date(activeDate.getFullYear(), activeDate.getMonth(), 1);
    document.querySelector('#month_name').innerHTML = activeMonth;
    document.querySelector('#dates_of_month').replaceChildren();
    for (let i = 0; i < firstDate.getDay(); i++) {
        document.querySelector('#dates_of_month').appendChild(document.createElement("li"));
    }
    let lastDate = new Date(firstDate.getFullYear(), firstDate.getMonth() + 1, 0).getDate();
    for (let i = 0; i < lastDate; i++) {
        let day = document.createElement("a");
        day.href = "#";
        day.onclick = () => {
            let selectedDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), i + 1);
            loadJournalEntry(selectedDate);
            activeDate = selectedDate;
            for (let element of document.getElementsByClassName("active")) {
                element.className = "";
            }
            day.className = "active";
        }
        if (i + 1 == activeDate.getDate()) {
            day.className = "active";
        }
        day.innerHTML = i + 1;
        document.querySelector('#dates_of_month').appendChild(day);
    }

}

function addEntry() {
    let entry = document.getElementById('journalEntry').value;
    localStorage.setItem(activeDate.toDateString(), entry);
}

function previousMonth() {
    activeDate = new Date(activeDate.getFullYear(), activeDate.getMonth() - 1, activeDate.getDate());
    displayCalendar(activeDate);
}

function nextMonth() {
    activeDate = new Date(activeDate.getFullYear(), activeDate.getMonth() + 1, activeDate.getDate());
    displayCalendar(activeDate);
}
//when page loads get current date. use to build out calendar (add children to grid container based on current month)