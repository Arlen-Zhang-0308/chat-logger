import { useState, useEffect } from "react";
import { host } from "../App";
import "../style/register.css";
import { useNavigate } from "react-router-dom";

const RESEND_TIME = 5;

export default function Register() {
    const registerUrl = `${host}/user/register`;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [veriCode, setVeriCode] = useState("");
    const [resendString, setResendString] = useState("Resend")
    const [resendTimer, setResendTimer] = useState(RESEND_TIME);

    const navigate = useNavigate();

    useEffect(() => {
        if(resendTimer <=0) {
            setResendString("")
            return;
        }

        const interval = setInterval(() => {
            setResendTimer((previous) => previous - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [resendTimer]);

    const handleEmailChange = function (e) {
        setEmail(e.target.value);
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
    const handleResendClick = function (e) {
        setResendTimer(RESEND_TIME);
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
            console.log(data);
            navigate("/login");
        })
        .catch(err => console.error(err));
    }
    return (
        <div className="login-main-box">
            <div className="login-box">
                <form onSubmit={submit}>
                    <div>
                        <label>Email</label>
                        <input type="text" name="email" value={email} onChange={handleEmailChange} />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" name="password" value={password} onChange={handlePasswordChange} />
                    </div>
                    <div>
                        <label>Confirm password</label>
                        <div>
                            <input type="password" name="confirmPasswor" value={veriCode} onChange={handleVeriCodeChange} />
                            <span>{password? password===confirmPassword? '✔': '❌': ""}</span>
                        </div>
                    </div>
                    <div>
                        <label>Verification code</label>
                        <div>
                            <input type="text" name="verification-code" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                            <button className="resend-code-btn" onClick={handleResendClick}>{resendString}</button>
                        </div>
                    </div>
                    
                    <input type="submit" value="Login" />
                </form>
            </div>
        </div>
    );
}