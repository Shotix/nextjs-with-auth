"use client";

import React, { createContext, useContext } from "react";
import {usePersonalData} from "@/hooks/useUserData";
import {User} from "@/data/interfaces";

interface UserContextType {
    user: User | null;
    isLoading: boolean;
    error: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data, error, isLoading } = usePersonalData();

    const user = data ? data.data : null;

    return (
        <UserContext.Provider
            value={{
                user: user,
                isLoading,
                error: error ? error.message : null,
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