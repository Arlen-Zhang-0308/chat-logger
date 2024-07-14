import { useState, useEffect } from "react";
import { host } from "../App";
import "../style/register.css";
import { useNavigate } from "react-router-dom";

const RESEND_TIME = 30;

export default function Register() {
    const veriCodeUrl = `${host}/user/send-verify`;
    const registerUrl = `${host}/user/register`;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [veriCode, setVeriCode] = useState("");
    const [resendString, setResendString] = useState("Resend")
    const [resendTimer, setResendTimer] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        if(resendTimer <= 0) {
            setResendString("Resend");
            return;
        }

        const interval = setInterval(() => {
            setResendTimer((previous) => previous - 1);
        }, 1000);

        setResendString(`${resendTimer}s to resend`);

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
        fetch(`${veriCodeUrl}?email=${email}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => console.error(err));

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
                            <input type="password" name="confirmPasswor" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                            <span>{password? password===confirmPassword? '✔': '❌': ""}</span>
                        </div>
                    </div>
                    <div>
                        <label>Verification code</label>
                        <div>
                            <input type="text" name="verification-code" value={veriCode} onChange={handleVeriCodeChange} />
                            <button type="button" className="resend-code-btn" onClick={handleResendClick}>{resendString}</button>
                        </div>
                    </div>
                    
                    <input type="submit" value="Login" />
                </form>
            </div>
        </div>
    );
}