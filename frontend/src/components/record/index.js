import React from "react";
import "./index.css"

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

    if(!content) {
        content = "";
    }
    const lines = content.split("\n").length;
    return (
        <li className="record-line">
            <label className="record-label">{timeString}</label>
            <textarea className="record-input" value={content} rows={lines} readOnly/>
        </li>
    );
}