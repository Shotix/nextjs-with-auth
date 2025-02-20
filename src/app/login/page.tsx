"use client";

import React, {useEffect} from "react";
import {useAuth} from "@/contexts/AuthContext";
import {ApiErrorResponse} from "@/data/ApiErrorResponse";

const LoginPage: React.FC = () => {
    const { login, loginLoading } = useAuth();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState<string | null>(null);
    const [loginButtonEnabled, setLoginButtonEnabled] = React.useState(false);

    useEffect(() => {
        if (username.length === 0 || password.length === 0 || loginLoading) {
            setLoginButtonEnabled(false);
        } else {
            setLoginButtonEnabled(true);
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await login(username, password);
            if (response instanceof ApiErrorResponse) {
                setError(response.message);
            }
        } catch {
            setError("There was an error logging in");
        }
    };

    return (
        <div className={"form-container"}>
            <form onSubmit={handleLogin}>
                <div className={"form-header"}>
                    <h1>Login</h1>
                </div>
                <div className={"form-input"}>
                    <label>
                        Username
                        <input
                            type="text"
                            className={username.length === 0 ? "invalid" : ""}
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                </div>
                
                <div className={"form-actions"}>
                    <button type="submit" disabled={!loginButtonEnabled}>
                        {loginLoading ? "Logging in..." : "Login"}
                    </button>
                </div>
                
                <div className={"form-footer"}>
                    {error && <p>{error}</p>}
                </div>
            </form>
            
            <div className={"form-additional-actions"}>
                <a href="/register">Don&#39;t have an account? Register</a>
            </div>
        </div>
    );
};

export default LoginPage;