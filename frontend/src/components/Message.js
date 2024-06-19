import React from "react";

export default function Message(args) {
    let time = args.time;
    let content = args.content;
    return (
        <li className="message-line">
            <label className="message-label">{time}</label>
            <input className="message-input" value={content} readOnly />
        </li>
    );
}