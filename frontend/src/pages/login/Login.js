import { useState } from "react";

import { host } from "../../App";
import "./login.css";
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

    const submit = async function (e) {
        e.preventDefault();
        const response = await fetch(loginUrl, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        if(response.status === 401) {
            const errText = await response.text();
            alert(errText);
            return;
        }
        const data = await response.json();
        if(data.result === "failed") {
            alert(data.message);
            return;
        }
        console.log(data);
        if(data.result !== "failed") {
            localStorage.setItem("access-token", data.message);
            localStorage.setItem("email", data.result);
            navigate("/");
        }
        else {
            alert(`Login failed: ${data.message}`);
        }
    }

    return (
        <div className="login-main-box">
            <div className="login-box">
                <form onSubmit={submit}>
                    <table>
                        <tbody>
                            <tr>
                                <th><label>Email</label></th>
                                <td><input type="text" name="email" value={email} onChange={handleEmailChange} /></td>
                            </tr>
                            <tr>
                                <th><label>Password</label></th>
                                <td><input type="password" name="password" value={password} onChange={handlePasswordChange} /></td>
                            </tr>
                        </tbody>
                    </table>

                    {(password && email? <input style={{margin: "15px"}} type="submit" value="Login" /> : <input style={{margin: "15px"}} type="submit" value="Login" disabled/>)}
                </form>

                <div className="register-link-text">Do not have an account? <a href="/register">Click here</a> to register.</div>
                <div className="register-link-text"><a href="/">Use locally without an account.</a></div>
            </div>
        </div>
    );
}