"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {loginRequest, logoutRequest, registerRequest} from "@/services/userData";
import { ApiErrorResponse } from "@/data/ApiErrorResponse";
import { ApiResponse } from "@/data/interfaces";
import { setAccessToken as setGlobalAccessToken } from "@/utils/authStore";
import {refreshAccessTokenRequest} from "@/services/authenticationRequests";

interface AuthContextType {
    isAuthenticated: boolean;
    accessToken: string | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<ApiResponse<string> | ApiErrorResponse>;
    register: (username: string, email: string, password: string) => Promise<ApiResponse<string> | ApiErrorResponse>;
    refreshAccessToken: () => Promise<boolean>;
    logout: () => void;
    loginLoading: boolean;
    registerLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [loginLoading, setLoginLoading] = useState(false);
    const [registerLoading, setRegisterLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        refreshAccessToken()
            .then(() => {
                if (isMounted) {

                }
            })
            .catch(() => {
            })
            .finally(() => {
                if (isMounted) {
                    setLoading(false);
                }
            });
        return () => { isMounted = false; };
    }, []);


    const handleAuthError = (message: string): void => {
        setIsAuthenticated(false);
        setAccessToken(null);
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
            setLoginLoading(false);
            router.push("/");
            return response;
        } catch (error) {
            setLoginLoading(false);
            return error instanceof ApiErrorResponse ? error : new ApiErrorResponse("Login error");
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
            setAccessToken(token);
            setGlobalAccessToken(token);
            setIsAuthenticated(true);
            setRegisterLoading(false);
            router.push("/");
            return response;
        } catch (error) {
            setRegisterLoading(false);
            return error instanceof ApiErrorResponse ? error : new ApiErrorResponse("Register error");
        }
    };

    const refreshAccessToken = async (): Promise<boolean> => {
        try {
            const token = await refreshAccessTokenRequest(); // Assuming this returns the token string or null/throws
            if (token) {
                setAccessToken(token);
                setGlobalAccessToken(token); // if you use a global store for the token too
                setIsAuthenticated(true);
                return true;
            } else {
                setAccessToken(null);
                setGlobalAccessToken(null);
                setIsAuthenticated(false);
                return false;
            }
        } catch (error) {
            console.error("Refresh access token error:", error);
            setAccessToken(null);
            setGlobalAccessToken(null);
            setIsAuthenticated(false);
            return false;
        }
    };

    const logout = async () => {
        try {
            const response = await logoutRequest();
            // We should never get an error here, but just in case
            if (response instanceof ApiErrorResponse) {
                handleAuthError(response.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setAccessToken(null);
            setGlobalAccessToken(null);
            setIsAuthenticated(false);
            router.push("/");
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                accessToken,
                loading,
                login,
                register,
                refreshAccessToken,
                logout,
                loginLoading,
                registerLoading,
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