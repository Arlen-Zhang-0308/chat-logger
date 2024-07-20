import React from "react";
import "./index.css"

export default function MessageWindow(args) {
    const x = args.x;
    const y = args.y;
    const type = args.defaultType;
    let content;
    if(!type) {
        content = args.content;
    }
    else {
        if(type === "register-email") {
            content = "Invalid format";
        }
        else if(type === "register-password") {
            content = "At least 8 digits"
        }
        else content = "No message";
    }
    
    return (
        <div style={{position: "absolute", left: x+"px", top: y+"px"}}>
            <p></p>
            <div className="message-window-main-box">{content}</div>
        </div>
    );
}