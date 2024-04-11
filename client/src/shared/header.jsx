import React from 'react';

function Header() {

    return (
        <header>
            <img class="logo_img" src="Logo.png" alt="Accountable logo" width="108" height="85" />
            <h2 class="logo_text">Accountable</h2>
            |
            <nav>
                <menu>
                    <a class="top_nav_item" href="journal.html">Journal</a>
                    <a class="top_nav_item" href="friends.html">Friends</a>
                    <span class="spacer"></span>
                    <span id="users_journal_tag"></span>
                    <a class="top_nav_item log_out_button" href="index.html">Log Out</a>
                </menu>
            </nav>
        </header>
    );
};

export default Header;