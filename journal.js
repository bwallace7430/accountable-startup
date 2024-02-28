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

let activeDate = new Date;
addEventListener("load", setupPage);

function setupPage() {
    displayUserName();
    displayCalendar();
}

function displayUserName() {
    document.querySelector('#users_journal_tag').innerHTML = localStorage.getItem("username") + "'s Journal"
}

function loadJournalEntry(date) {
    console.log(date);
    let entry = localStorage.getItem(date.toString());
    document.getElementById('journalEntry').value = entry;
}

function displayCalendar() {
    let currDate = new Date();
    let currMonth = monthNums[currDate.getMonth()]
    let firstDate = new Date();
    firstDate.setDate(1);
    document.querySelector('#month_name').innerHTML = currMonth;
    for (let i = 0; i < firstDate.getDay(); i++) {
        document.querySelector('#dates_of_month').appendChild(document.createElement("li"));
    }
    let lastDate = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0).getDate();
    for (let i = 0; i < lastDate - 1; i++) {
        let day = document.createElement("a");
        day.href = "#";
        day.onclick = () => { loadJournalEntry(new Date(currDate.getFullYear(), currDate.getMonth(), i + 1)); }
        if (i + 1 == currDate.getDate()) {
            day.className = "active";
        }
        day.innerHTML = i + 1;
        document.querySelector('#dates_of_month').appendChild(day);
    }

}

function addEntry() {
    let entry = document.getElementById('journalEntry').value;
    localStorage.setItem(activeDate.toString(), entry);
}


//when page loads get current date. use to build out calendar (add children to grid container based on current month)