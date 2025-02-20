"use client";

import React from "react";
import {useAuth} from "@/contexts/AuthContext";
import {ApiErrorResponse} from "@/data/ApiErrorResponse";

const LoginPage: React.FC = () => {
    const { login, loginLoading } = useAuth();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState<string | null>(null);

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
        <>
            <form onSubmit={handleLogin}>
                <div className={"form-header"}>
                    <h1>Login</h1>
                </div>
                <div className={"form-input"}>
                    <label>
                        Username
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label>
                        Password
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                
                <div className={"form-actions"}>
                    <button type="submit" disabled={loginLoading}>
                        {loginLoading ? "Logging in..." : "Login"}
                    </button>
                </div>
                
                <div className={"form-footer"}>
                    {error && <p>{error}</p>}
                </div>
            </form>
        </>
    );
};

export default LoginPage;