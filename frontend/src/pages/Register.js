import { useState } from "react";
import { host } from "../App";
import "../style/register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const registerUrl = `${host}/user/register`;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleEmailChange = function (e) {
        setEmail(e.target.value);
    }
    const handlePasswordChange = function (e) {
        setPassword(e.target.value);
    }
    const handleConfirmPasswordChange = function (e) {
        setConfirmPassword(e.target.value);
    }

    const submit = function (e) {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert("Confirm password is not matched with password.")
            return;
        }
        fetch(registerUrl, {
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
                            <input type="password" name="confirmPasswor" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                            <span>{password? password===confirmPassword? '✔': '❌': ""}</span>
                        </div>
                    </div>
                    
                    <input type="submit" value="Login" />
                </form>
            </div>
        </div>
    );
}