"use client";

import React, {useEffect} from "react";
import {ApiErrorResponse} from "@/data/ApiErrorResponse";
import {useAuth} from "@/contexts/AuthContext";

const RegisterPage: React.FC = () => {
    const { register, registerLoading } = useAuth();
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [passwordsMatch, setPasswordsMatch] = React.useState(false);
    const [registerButtonEnabled, setRegisterButtonEnabled] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [isEmailValid, setIsEmailValid] = React.useState(false);
    const [isUsernameValid, setIsUsernameValid] = React.useState(false);

    useEffect(() => {
        if (password.length != 0) {
            if (password !== confirmPassword) {
                setPasswordsMatch(false);
            } else {
                setPasswordsMatch(true)
            }
        }
        
        if (username.length === 0) {
            setIsUsernameValid(false);
        } else {
            setIsUsernameValid(true);
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setIsEmailValid(false);
        } else {
            setIsEmailValid(true);
        }
        
        if (!passwordsMatch || !isUsernameValid || !isEmailValid || !passwordsMatch || confirmPassword.length === 0 || registerLoading) {
            setRegisterButtonEnabled(false);
        } else {
            setRegisterButtonEnabled(true);
        }
        
    }, [confirmPassword, email, email.length, isEmailValid, isUsernameValid, password, passwordsMatch, registerLoading, username.length]);
    

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await register(username, email, password);
            if (response instanceof ApiErrorResponse) {
                setError(response.message);
            }
        } catch {
            setError("There was an error logging in");
        }
    };

    return (
        <div className={"form-container"}>
            <form onSubmit={handleRegister}>
                <div className="form-header">
                    <h1>Register</h1>
                </div>
                <div className="form-input">
                    <label>
                        Username
                        <input
                            type="text"
                            className={!isUsernameValid ? "invalid" : ""}
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label>
                        Email
                        <input
                            type="email"
                            className={!isEmailValid ? "invalid" : ""}
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        Password
                        <input
                            type="password"
                            className={password.length === 0 ? "invalid" : ""}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <label>
                        Confirm Password
                        <input
                            type="password"
                            className={!passwordsMatch ? "invalid" : ""}
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </label>
                </div>
                <div className="form-actions">
                    <button type="submit" disabled={!registerButtonEnabled}>
                        {registerLoading ? "Registering..." : "Register"}
                    </button>
                </div>
                <div className="form-footer">
                    {error && <p>{error}</p>}
                </div>
            </form>
            
            <div className={"form-additional-actions"}>
                <a href="/login">Already have an account? Login</a>
            </div>
        </div>
    );
};

export default RegisterPage;