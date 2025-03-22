"use client";

import React from "react";
import "@/app/css/customButton.css";

interface CustomButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
                                                       label,
                                                       onClick,
                                                       disabled = false,
                                                       className = "",
                                                   }) => {
    return (
        <button className={`custom-button ${className}`} onClick={onClick} disabled={disabled}>
            {label}
        </button>
    );
};

export default CustomButton;