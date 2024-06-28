import React from "react";
import "./record.css"

export default function Record(args) {
    let content = args.content;
    let time = args.time;
    let dateTime = new Date(time);
    let month = dateTime.getMonth() + 1;
    let day = dateTime.getDate();
    let hour = dateTime.getHours();
    let minute = dateTime.getMinutes();
    let second = dateTime.getSeconds();
    let timeString = `${month}-${day} ${hour}:${minute}:${second}`;

    return (
        <li className="record-line">
            <label className="record-label">{timeString}</label>
            <input className="record-input" value={content} readOnly />
        </li>
    );
}