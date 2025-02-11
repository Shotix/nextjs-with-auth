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
            setError("Unexpected error occurred");
        }
    };
    
    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Username
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit" disabled={loginLoading}>
                    {loginLoading ? "Logging in..." : "Login"}
                </button>
                {error && <p>{error}</p>}
            </form>
        </>
    )
};

export default LoginPage;