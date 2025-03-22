"use client";
import React, { useState } from "react";
import SettingsSection from "@/components/ant-design/SettingsSection";
import styles from "./SettingsPage.module.css";
import {useUser} from "@/contexts/UserContext";
import ToggleSwitch from "@/components/ant-design/ToggleSwitch";

const SettingsPage: React.FC = () => {
    const { user } = useUser();
    
    const [twoFactorAuthEnabled, setTwoFactorAuthEnabled] = useState(!!user?.userSettings.twoFactorEnabled);
    const [twoFactorAuthButtonDisabled, setTwoFactorAuthButtonDisabled] = useState(false);
    const [switchLoading, setSwitchLoading] = useState(false);
    
    const changeTwoFactorAuth = async (enabled: boolean) => {
        // TODO: Call function of the userContext to change the settings
        
        if (enabled) {
            // TODO: Call function of the userContext to enable two factor auth
            // Simulate a 2 second delay
            setSwitchLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setSwitchLoading(false);
            setTwoFactorAuthButtonDisabled(true);
        }
        
        setTwoFactorAuthEnabled(enabled);
    }
    
    const changeTwoFactorAuthButtonDisabled = async (disabled: boolean) => {
        if (!disabled) {
            setSwitchLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setTwoFactorAuthEnabled(false)
            setSwitchLoading(false);
        }
        
        setTwoFactorAuthButtonDisabled(disabled);
    }

    return (
        <div className={styles.settingsPage}>
            <h1 className={styles.settingsTitle}>Settings</h1>
            {/* Login Settings Section */}
            <SettingsSection 
                title={"Security"} 
                label={"Manage your security settings"}
            >
                <ToggleSwitch 
                    onChange={changeTwoFactorAuth} 
                    checked={twoFactorAuthEnabled} 
                    disabled={twoFactorAuthButtonDisabled}
                    loading={switchLoading}
                    switchMessage={"Two Factor Authentication"}
                    onDisabledChange={twoFactorAuthEnabled ? changeTwoFactorAuthButtonDisabled : undefined}
                    disabledMessage={"Disable Two Factor Authentication"}
                />
            </SettingsSection>
        </div>
    );
};

export default SettingsPage;