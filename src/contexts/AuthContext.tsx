"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {fetchUserData, loginRequest} from "@/services/userData";
import {ApiErrorResponse} from "@/data/ApiErrorResponse";
import {ApiResponse} from "@/data/interfaces";

interface AuthContextType {
    isAuthenticated: boolean;
    user: { username: string } | null;
    loading: boolean;
    authToken: string | null;
    login: (username: string, password: string) => Promise<ApiResponse<string> | ApiErrorResponse>;
    loginLoading: boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [user, setUser] = useState<{ username: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [loginLoading, setLoginLoading] = useState(false);
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
    
    const getUserData = async () => {
        try {
            const response = await fetchUserData();
            if (response instanceof ApiErrorResponse) {
                setIsAuthenticated(false);
                setAuthToken(null);
                setUser(null);
                setLoading(false);

                throw new Error(response.message);
            }
            const user = response.data;
            setUser(user);
        } catch {
            setIsAuthenticated(false);
            setAuthToken(null);
            setUser(null);
            setLoading(false);

            throw new Error("There was an error getting the user data");
        }
    }

    const login = async (
        username: string,
        password: string
    ): Promise<ApiResponse<string> | ApiErrorResponse> => {
        try {
            setLoginLoading(true);
            const response = await loginRequest(username, password);
            if (response instanceof ApiErrorResponse) {
                setLoginLoading(false);
                return response;
            }
            const token = response.data;
            localStorage.setItem("authToken", token);
            setAuthToken(token);
            setIsAuthenticated(true);

            await getUserData();

            setLoginLoading(false);
            return response;
        } catch (error) {
            setLoginLoading(false);
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
        <AuthContext.Provider value={{ isAuthenticated, authToken, user, loading, login, loginLoading, logout }}>
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
