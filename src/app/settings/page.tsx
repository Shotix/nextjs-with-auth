"use client";
import React, { useState } from "react";
import SettingsSection from "@/app/components/ui/SettingsSection";
import styles from "./SettingsPage.module.css";
import ToggleSwitchDisabled from "@/app/components/ui/ToggleSwitchDisabled";

const SettingsPage: React.FC = () => {
    // State for each settings category
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);
    const [twoFactorAuthDisabled, setTwoFactorAuthDisabled] = useState(false);
    
    const handleTwoFactorAuth = (checked: boolean) => {
        setTwoFactorAuth(checked);
    }
    
    const handleTwoFactorAuthDisabled = (disabled: boolean) => {
        setTwoFactorAuthDisabled(disabled);
    }
    

    return (
        <div className={styles.settingsPage}>
            <h1 className={styles.settingsTitle}>Settings</h1>
            {/* Login Settings Section */}
            <SettingsSection title="Login Settings">
                <ToggleSwitchDisabled 
                    onChange={handleTwoFactorAuth} 
                    onDisabledChange={handleTwoFactorAuthDisabled}
                    disabled={twoFactorAuthDisabled}
                    switchMessage={"Two Factor Authentication"}
                />
            </SettingsSection>
        </div>
    );
};

export default SettingsPage;