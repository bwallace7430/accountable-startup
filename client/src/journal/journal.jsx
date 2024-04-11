import React from 'react';
import './journal.css';

function Journal() {

    return (
        <main>
            <div class="left_pane">
                <div class="calendar">
                    <ul class="month">
                        <a href="#" class="arrows" id="previous" onclick="previousMonth()">&#10094;</a>
                        <span class="spacer"></span>
                        <li id="month_name"></li>
                        <span class="spacer"></span>
                        <a href="#" class="arrows" id="next" onclick="nextMonth()">&#10095;</a>
                    </ul>
                    <ul class="day_names">
                        <li>S</li>
                        <li>M</li>
                        <li>T</li>
                        <li>W</li>
                        <li>T</li>
                        <li>F</li>
                        <li>S</li>
                    </ul>
                    <ul class="calendar_days" id="dates_of_month">
                    </ul>
                </div>
                <h3>Daily Quote: </h3>
                <p id="quote"></p>
            </div>
            <div class="right_pane">
                <label for="journalEntry">
                    2/5/2024
                </label>
                <textarea id="journalEntry" placeholder="Write your next entry here."></textarea>
                <button onclick="addEntry()">Add Entry</button>
            </div>
        </main>
    );
}

export default Journal;