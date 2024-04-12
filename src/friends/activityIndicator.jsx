import React from "react";
import './friends.css'

function ActivityIndicator({ friend, hasWritten }) {

    return (
        <li>
            <span className={hasWritten ? "friend_activity_indicator active" : "friend_activity_indicator inactive"}></span>
            <p>{friend}</p>
        </li>
    )
}

export default ActivityIndicator;