import { useState, useEffect } from "react";
import { host } from "../../App";
import "./register.css";
import { useNavigate } from "react-router-dom";
import MessageWindow from "../../components/MessageWindow";

const RESEND_TIME = 30;
const emailReg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;

export default function Register() {
    const veriCodeUrl = `${host}/user/send-verify`;
    const registerUrl = `${host}/user/register`;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [veriCode, setVeriCode] = useState("");
    const [sendString, setSendString] = useState("Send")
    const [sendTimer, setSendTimer] = useState(0);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [position, setPosition] = useState({x: 0, y:0});
    const [messageVisible, setMessageVisible] = useState(false);
    const [messageType, setMessageType] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if(sendTimer <= 0) {
            setSendString("Send");
            return;
        }

        const interval = setInterval(() => {
            setSendTimer((previous) => previous - 1);
        }, 1000);

        setSendString(`${sendTimer}s to send`);

        return () => clearInterval(interval);
    }, [sendTimer]);

    const handleEmailChange = async function (e) {
        const content = e.target.value;
        setIsValidEmail(emailReg.test(content));
        setEmail(content);
    }
    const handlePasswordChange = function (e) {
        setPassword(e.target.value);
    }
    const handleConfirmPasswordChange = function (e) {
        setConfirmPassword(e.target.value);
    }
    const handleVeriCodeChange = function (e) {
        setVeriCode(e.target.value);
    }
    const handleSendClick = function (e) {
        fetch(`${veriCodeUrl}?email=${email}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            setSendString("Sended");
            alert(data.message);
            if(data.result !== "failed") {
                setSendTimer(RESEND_TIME);
            }
        })
        .catch(err => console.error(err));
        setSendString("Sending...");
    }

    const handleMouseEnter = function(e) {
        setPosition({x: e.pageX, y: e.pageY});
        setMessageVisible(true);
    }
    const handleMouseLeave = function(e) {
        setMessageVisible(false);
    }

    const submit = function (e) {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert("Confirm password is not matched with password.")
            return;
        }

        fetch(`${registerUrl}?code=${veriCode}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.result === "failed") {
                alert(data.message);
            }
            else {
                alert(data.message);
                navigate("/login");
            }
        })
        .catch(err => console.error(err));
    }

    return (
        <div className="register-main-box">
            {messageVisible? <MessageWindow defaultType={messageType} x={position.x} y={position.y}></MessageWindow>: null}
            <div className="register-box">
                <form onSubmit={submit}>
                    <table>
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <td><input type="text" name="email" value={email} onChange={handleEmailChange} /></td>
                                <td><span onMouseOver={(event) => {handleMouseEnter(event); setMessageType("register-email")}} onMouseOut={handleMouseLeave}>{email? isValidEmail ? '✔' : '❌': ""}</span></td>
                            </tr>
                            <tr>
                                <th>Password</th>
                                <td><input type="password" name="password" value={password} onChange={handlePasswordChange} /></td>
                                <td>
                                    <span onMouseEnter={(event) => {handleMouseEnter(event); setMessageType("register-password")}} onMouseLeave={handleMouseLeave}>{password ? (password.length >= 8 ? '✔' : '❌') : ""}</span>
                                </td>
                            </tr>
                            <tr>
                                <th>Confirm password</th>
                                <td>
                                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                                </td>
                                <td>
                                    <span>{password ? (password === confirmPassword ? '✔' : '❌') : ""}</span>
                                </td>
                            </tr>
                            <tr>
                                <th>Verification code</th>
                                <td>
                                    <input type="text" name="verification-code" value={veriCode} onChange={handleVeriCodeChange} />
                                </td>
                                <td>
                                    {isValidEmail? <button type="button" className="send-code-btn" onClick={handleSendClick}>{sendString}</button>: <button type="button" className="send-code-btn" onClick={handleSendClick} disabled>{sendString}</button>}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {(password === confirmPassword && password && veriCode? <input style={{margin: "15px"}} type="submit" value="Register" /> : <input style={{margin: "15px"}} type="submit" value="Register" disabled/>)}
                    
                    <div className="login-link-text">Already have an account? <a href="/login">Click here</a> to login.</div>
                    <div className="login-link-text"><a href="/">Use locally without an account.</a></div>
                </form>
            </div>
        </div>
    );
}