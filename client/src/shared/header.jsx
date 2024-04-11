import React from 'react';
import logo from '../assets/Logo.png'
import './header.css';

function Header() {

    return (
        <header>
            <img className="logo_img" src={logo} alt="Accountable logo" width="108" height="85" />
            <h2 className="logo_text">Accountable</h2>
            |
            <nav>
                <menu>
                    <a className="top_nav_item" href="journal.html">Journal</a>
                    <a className="top_nav_item" href="friends.html">Friends</a>
                    <span className="spacer"></span>
                    <span id="users_journal_tag"></span>
                    <a className="top_nav_item log_out_button" href="/journal">Log Out</a>
                </menu>
            </nav>
        </header>
    );
};

export default Header;