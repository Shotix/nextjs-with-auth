"use client";

import React, { createContext, useContext } from "react";
import { usePersonalData } from "@/hooks/useUserData";
import { User } from "@/data/interfaces";
import { useAuth } from "./AuthContext";

interface UserContextType {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    refetchUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, loading: authLoading, accessToken } = useAuth();

    const { data, error, isLoading, refetch } = usePersonalData({
        enabled: isAuthenticated && !!accessToken && !authLoading,
    });

    const user = data ? data.data : null;

    return (
        <UserContext.Provider
            value={{
                user,
                isLoading: (isAuthenticated && !!accessToken && !authLoading) ? isLoading : false,
                error: error ? error.message : null,
                refetchUser: refetch,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};