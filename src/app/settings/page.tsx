"use client";
import React, { useState } from "react";
import SettingsSection from "@/components/ant-design/SettingsSection";
import styles from "./SettingsPage.module.css";
import {useUser} from "@/contexts/UserContext";
import ToggleSwitch from "@/components/ant-design/ToggleSwitch";
import AuthModal from "@/components/custom/AuthModal";

const SettingsPage: React.FC = () => {
    const { user } = useUser();
    
    const [twoFactorAuthEnabled, setTwoFactorAuthEnabled] = useState(!!user?.userSettings.twoFactorEnabled);
    const [twoFactorAuthButtonDisabled, setTwoFactorAuthButtonDisabled] = useState(false);
    const [switchLoading, setSwitchLoading] = useState(false);

    // Modal props
    const [showModal, setShowModal] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [okButtonProps, setOkButtonProps] = useState({disabled: true});
    const [twoFactorAuthValue, setTwoFactorAuthValue] = useState("");
    
    
    const okModal = () => {
        // TODO: Check 2FA code
        setConfirmLoading(true)
        
        // For now, assume it is correct
        setTimeout(() => {
            setConfirmLoading(false);
            setShowModal(false);
            setSwitchLoading(false)
            setTwoFactorAuthEnabled(true);
            setTwoFactorAuthButtonDisabled(true);
            setOTPValue("");
        }, 2000)
    }
    
    const setOTPValue = (value: string) => {
        setTwoFactorAuthValue(value);
        
        if (twoFactorAuthValue.length === 5) {
            setOkButtonProps({disabled: false});
        } else {
            setOkButtonProps({disabled: true});
        }
    }
    
    const cancelModal = () => {
        setShowModal(false);
        setSwitchLoading(false);
        setTwoFactorAuthEnabled(false);
        setOTPValue("");
        setOkButtonProps({disabled: true});
    }
    
    const changeTwoFactorAuth = async (enabled: boolean) => {
        if (enabled) {
            setSwitchLoading(true);
            setShowModal(true);
        } 
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


            {/* Modal */}
            <AuthModal 
                showModal={showModal} 
                okModal={okModal} 
                cancelModal={cancelModal} 
                confirmLoading={confirmLoading} 
                okButtonProps={okButtonProps} 
                value={twoFactorAuthValue} 
                setOTPValue={setOTPValue}
            />
        </div>
    );
};

export default SettingsPage;