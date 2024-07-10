import { useState } from "react";
import * as jose from 'jose';

import { host } from "../App";
import "../style/login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const loginUrl = `${host}/user/login`;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleEmailChange = function (e) {
        setEmail(e.target.value);
    }
    const handlePasswordChange = function (e) {
        setPassword(e.target.value);
    }

    const submit = function (e) {
        e.preventDefault();
        fetch(loginUrl, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.result === "ok") {
                localStorage.setItem("access-token", data.message);
                navigate("/");
            }
            else {
                alert(`Login failed: ${data.message}`);
            }
        })
        .catch(err => console.error(err));
    }

    return (
        <div className="login-main-box">
            <div className="login-box">
                <form onSubmit={submit}>
                    <div>
                        <label>Username</label>
                        <input type="text" name="email" value={email} onChange={handleEmailChange} />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" name="password" value={password} onChange={handlePasswordChange} />
                    </div>
                    <input type="submit" value="Login" />
                </form>
            </div>
        </div>
    );
}