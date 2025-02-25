"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchUserData, loginRequest, registerRequest } from "@/services/userData";
import { ApiErrorResponse } from "@/data/ApiErrorResponse";
import { ApiResponse } from "@/data/interfaces";
import { setAccessToken as setGlobalAccessToken } from "@/utils/authStore";
import {refreshAccessTokenRequest} from "@/services/authenticationRequests";

interface AuthContextType {
    isAuthenticated: boolean;
    user: { username: string } | null;
    loading: boolean;
    accessToken: string | null;
    login: (username: string, password: string) => Promise<ApiResponse<string> | ApiErrorResponse>;
    register: (username: string, email: string, password: string) => Promise<ApiResponse<string> | ApiErrorResponse>;
    refreshAccessToken: () => Promise<boolean>;
    loginLoading: boolean;
    registerLoading: boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState<{ username: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [loginLoading, setLoginLoading] = useState(false);
    const [registerLoading, setRegisterLoading] = useState(false);
    const router = useRouter();


   useEffect(() => {
        refreshAccessToken().then(success => {
            if (success) {
                setIsAuthenticated(true);
                getUserData().then(() => console.log("User data loaded"));
            }
            setLoading(false);
        });
    }, []);

    const getUserData = async (): Promise<void> => {
        try {
            const response = await fetchUserData();
            if (response instanceof ApiErrorResponse) {
                handleAuthError(response.message);
                return;
            }
            const userData = response.data;
            setUser(userData);
        } catch {
            handleAuthError("There was an error getting the user data");
        }
    };

    const handleAuthError = (message: string): void => {
        setIsAuthenticated(false);
        setAccessToken(null);
        setUser(null);
        setLoading(false);
        setLoginLoading(false);
        setRegisterLoading(false);
        setGlobalAccessToken(null);
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
                handleAuthError(response.message);
                setLoginLoading(false);
                return response;
            }
            const token = response.data;
            setAccessToken(token);
            setGlobalAccessToken(token);
            setIsAuthenticated(true);
            await getUserData();
            setLoginLoading(false);
            router.push("/");
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
                setRegisterLoading(false);
                return response;
            }
            const token = response.data;
            setAccessToken(token);
            setGlobalAccessToken(token);
            setIsAuthenticated(true);
            await getUserData();
            setRegisterLoading(false);
            router.push("/");
            return response;
        } catch (error) {
            setRegisterLoading(false);
            if (error instanceof ApiErrorResponse) {
                return error;
            }
            throw new Error(error instanceof Error ? error.message : "Error logging in");
        }
    };
    
    const refreshAccessToken = async (): Promise<boolean> => {
        try {
            const res = await refreshAccessTokenRequest();
            if (!res) {
                setAccessToken(null);
                setIsAuthenticated(false);
                return false;
            }
            setAccessToken(res);
            setGlobalAccessToken(res);
            return true;
        } catch (error) {
            console.error("Refresh access token error:", error);
            setAccessToken(null);
            setIsAuthenticated(false);
            return false;
        }
    };

    const logout = () => {
        setAccessToken(null);
        setGlobalAccessToken(null);
        setIsAuthenticated(false);
        setUser(null);
        router.push("/");
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                accessToken,
                user,
                loading,
                login,
                register,
                refreshAccessToken,
                loginLoading,
                registerLoading,
                logout,
            }}
        >
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