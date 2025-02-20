"use client";

import React from "react";
import CustomButton from "@/app/components/ui/CustomButton";
import { useAuth } from "@/contexts/AuthContext";

const LogoutButton: React.FC = () => {
    const { logout } = useAuth();
    return <CustomButton label="Logout" onClick={logout} />;
};

export default LogoutButton;