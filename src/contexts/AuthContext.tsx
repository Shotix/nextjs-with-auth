"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {fetchUserData, loginRequest, registerRequest} from "@/services/userData";
import {ApiErrorResponse} from "@/data/ApiErrorResponse";
import {ApiResponse} from "@/data/interfaces";

interface AuthContextType {
    isAuthenticated: boolean;
    user: { username: string } | null;
    loading: boolean;
    authToken: string | null;
    login: (username: string, password: string) => Promise<ApiResponse<string> | ApiErrorResponse>;
    register: (username: string, email: string, password: string) => Promise<ApiResponse<string> | ApiErrorResponse>;
    loginLoading: boolean;
    registerLoading: boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [user, setUser] = useState<{ username: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [loginLoading, setLoginLoading] = useState(false);
    const [registerLoading, setRegisterLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Get the authentication token from the local storage
        const token = localStorage.getItem("authToken");
        if (token) {
            getUserData().then(() => {
                setIsAuthenticated(true);
                setAuthToken(token);
                setLoading(false);
            });
        } else {
            setIsAuthenticated(false);
            setAuthToken(null);
            setUser(null);
            setLoading(false)
        }
    }, []);

    const getUserData = async (): Promise<void> => {
        try {
            const response = await fetchUserData();
            if (response instanceof ApiErrorResponse) {
                handleAuthError(response.message);
                return;
            }
            const user = response.data;
            setUser(user);
        } catch {
            handleAuthError("There was an error getting the user data");
        }
    };

    const handleAuthError = (message: string): void => {
        setIsAuthenticated(false);
        setAuthToken(null);
        setUser(null);
        setLoading(false);
        setLoginLoading(false);
        setRegisterLoading(false);
        console.error("Auth error: ", message);
    };

    const login = async (
        username: string,
        password: string
    ): Promise<ApiResponse<string> | ApiErrorResponse> => {
        try {
            setLoginLoading(true);
            const response = await loginRequest(username, password);
            if (response instanceof ApiErrorResponse) {
                console.log("We have an error of type ApiErrorResponse");
                handleAuthError(response.message)
                return response;
            }
            const token = response.data;
            localStorage.setItem("authToken", token);
            setAuthToken(token);
            setIsAuthenticated(true);

            await getUserData();

            setLoginLoading(false);
            router.push("/")
            return response;
        } catch (error) {
            setLoginLoading(false);
            if (error instanceof ApiErrorResponse) {
                return error;
            }
            throw new Error(error instanceof Error ? error.message : "Error logging in");
        }
    };
    
    const register = async (
        username: string,
        email: string,
        password: string
    ): Promise<ApiResponse<string> | ApiErrorResponse> => {
        try {
            setRegisterLoading(true);
            const response = await registerRequest(username, email, password);
            if (response instanceof ApiErrorResponse) {
                handleAuthError(response.message);
                return response;
            }
            const token = response.data;
            localStorage.setItem("authToken", token);
            setAuthToken(token);
            setIsAuthenticated(true);

            await getUserData();

            setRegisterLoading(false);
            router.push("/")
            return response;
        } catch (error) {
            setRegisterLoading(false);
            if (error instanceof ApiErrorResponse) {
                return error;
            }
            throw new Error(error instanceof Error ? error.message : "Error logging in");
        }
    };
    
    const logout = () => {
        localStorage.removeItem("authToken");
        setAuthToken(null);
        setIsAuthenticated(false);
        setUser(null);
        router.push("/");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, authToken, user, loading, login, register, loginLoading, registerLoading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
