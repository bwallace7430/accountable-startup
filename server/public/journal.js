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
const api_url = "https://type.fit/api/quotes";

let activeDate = new Date();
addEventListener("load", setupPage);

function setupPage() {
    displayUserName();
    displayCalendar(new Date(activeDate.getFullYear(), activeDate.getMonth(), 1));
    loadJournalEntry(activeDate);
    getQuote(api_url);
}

function displayUserName() {
    document.querySelector('#users_journal_tag').innerHTML = localStorage.getItem("username") + "'s Journal"
}

async function loadJournalEntry(date) {
    let userid = localStorage.getItem('userid');
    let response = await fetch(`/api/users/${userid}/entries?day=${date.toDateString()}`)
    if (!response.ok) {
        document.getElementById('journalEntry').value = "";
        return
    }
    let { entry } = await response.json();
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

async function addEntry() {
    let userid = localStorage.getItem('userid');
    let entry = document.getElementById('journalEntry').value;
    let day = activeDate.toDateString()

    await fetch(`/api/users/${userid}/entries`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ day, entry })
    })
}

function previousMonth() {
    activeDate = new Date(activeDate.getFullYear(), activeDate.getMonth() - 1, activeDate.getDate());
    displayCalendar(activeDate);
}

function nextMonth() {
    activeDate = new Date(activeDate.getFullYear(), activeDate.getMonth() + 1, activeDate.getDate());
    displayCalendar(activeDate);
}

async function getQuote(url) {
    const response = await fetch(url);
    var data = await response.json();
    let index = Math.floor(Math.random() * data.length)
    let { text, author } = data[index];
    document.getElementById("quote").textContent = `"${text}" - ${author.split(",")[0]}`;
}
//when page loads get current date. use to build out calendar (add children to grid container based on current month)