import React from 'react';
import { useState, useEffect } from 'react';
import './journal.css';


function Journal() {

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

    const [user, setUser] = useState();
    const [activeDate, setActiveDate] = useState(new Date());
    const [currDisplayedDate, setCurrDisplayedDate] = useState(new Date(activeDate.getFullYear(), activeDate.getMonth()));
    const [journalEntry, setJournalEntry] = useState("");
    const [dates, setDates] = useState([])
    const [quote, setQuote] = useState("");

    useEffect(() => {
        setupPage();
    }, []);

    const setupPage = async () => {
        await loadUser();
        displayDates();
        loadJournalEntry(activeDate);
        getQuote(api_url);
    }

    const loadUser = async () => {
        let response = await fetch("/api/users/me");
        let json = await response.json();
        setUser(json.user);
    }

    const loadJournalEntry = async (date) => {
        let response = await fetch(`/api/my/entries?day=${date.toDateString()}`)
        let { entry } = await response.json();
        if (!entry) {
            return;
        }
        setJournalEntry(entry.entry)
    }

    const handleDayClick = (day) => {
        let selectedDate = new Date(currDisplayedDate.getFullYear(), currDisplayedDate.getMonth(), day);
        loadJournalEntry(selectedDate);
        setActiveDate(selectedDate);
    }

    const displayDates = () => {
        let days = [];
        let firstDate = new Date(currDisplayedDate.getFullYear(), currDisplayedDate.getMonth(), 1);
        for (let i = 0; i < firstDate.getDay(); i++) {
            days.push(<li key={firstDate.toISOString() + i}></li>)
        }
        let lastDate = new Date(firstDate.getFullYear(), firstDate.getMonth() + 1, 0).getDate();
        for (let j = 1; j <= lastDate; j++) {
            days.push(
                <a
                    key={j}
                    href='#'
                    onClick={() => handleDayClick(j)}
                    className={(j === activeDate.getDate() && currDisplayedDate.getMonth() === activeDate.getMonth() && currDisplayedDate.getFullYear() === activeDate.getFullYear()) ? "active_day" : ""}>
                    {j}
                </a>)
        }
        return days;
    }

    const previousMonth = () => {
        let newDate = new Date(currDisplayedDate.getFullYear(), currDisplayedDate.getMonth() - 1, 1);
        setCurrDisplayedDate(newDate);
    }

    const nextMonth = () => {
        let newDate = new Date(currDisplayedDate.getFullYear(), currDisplayedDate.getMonth() + 1, 1);
        setCurrDisplayedDate(newDate);
    }

    const addEntry = async () => {
        let day = activeDate.toDateString()

        await fetch(`/api/my/entries`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ day, journalEntry })
        })
    }

    const getQuote = async (url) => {
        const response = await fetch(url);
        var data = await response.json();
        let index = Math.floor(Math.random() * data.length);
        let { text, author } = data[index];
        setQuote(`"${text}" - ${author.split(",")[0]}`);
    }

    return (
        <main>
            <div className="journal_left_pane">
                <div className="calendar">
                    <ul className="month">
                        <a href="#" className="arrows" id="previous" onClick={previousMonth}>&#10094;</a>
                        <span className="journal_spacer"></span>
                        <li id="month_name">{monthNums[currDisplayedDate.getMonth()]}</li>
                        <span className="journal_spacer"></span>
                        <a href="#" className="arrows" id="next" onClick={nextMonth}>&#10095;</a>
                    </ul>
                    <ul className="day_names">
                        <li>S</li>
                        <li>M</li>
                        <li>T</li>
                        <li>W</li>
                        <li>T</li>
                        <li>F</li>
                        <li>S</li>
                    </ul>
                    <ul className="calendar_days" id="dates_of_month">
                        {displayDates(currDisplayedDate)}
                    </ul>
                </div>
                <h3>Daily Quote: </h3>
                <p id="quote" className='journal_p'>{quote}</p>
            </div>
            <div className="journal_right_pane">
                <label htmlFor="journalEntry">
                    2/5/2024
                </label>
                <textarea id="journalEntry" placeholder="Write your next entry here." value={journalEntry || ""} onChange={(event) => setJournalEntry(event.target.value)}></textarea>
                <button onClick={addEntry}>Add Entry</button>
            </div>
        </main>
    );
}

export default Journal;