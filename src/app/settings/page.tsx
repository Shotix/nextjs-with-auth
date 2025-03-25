"use client";
import React, { useState } from "react";
import SettingsSection from "@/components/ant-design/SettingsSection";
import styles from "./SettingsPage.module.css";
import { useUser } from "@/contexts/UserContext";
import ToggleSwitch from "@/components/ant-design/ToggleSwitch";
import AuthModal from "@/components/custom/AuthModal";
import {QRStatus} from "antd/es/qr-code/interface";

const SettingsPage: React.FC = () => {
    const { user } = useUser();

    // Reflect whether 2FA is currently enabled for this user
    const [twoFactorAuthEnabled, setTwoFactorAuthEnabled] = useState(
        !!user?.userSettings.twoFactorEnabled
    );

    // Track whether we are in the midst of enabling or disabling 2FA
    const [isEnabling2FA, setIsEnabling2FA] = useState(false);
    const [isDisabling2FA, setIsDisabling2FA] = useState(false);

    // Modal Control
    const [showModal, setShowModal] = useState(false);
    
    // QR Code States
    const [qrCodeValue, setQRCodeValue] = useState("");
    const [qrCodeStatus, setQRCodeStatus] = useState<QRStatus>("active" as QRStatus);

    // OTP Verification States
    const [otpCode, setOtpCode] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [isOtpValid, setIsOtpValid] = useState(true);
    const [isOkDisabled, setIsOkDisabled] = useState(true);

    // ─────────────────────────────────────────────────────────────
    //  EVENT HANDLERS
    // ─────────────────────────────────────────────────────────────

    /**
     * Called whenever the user toggles the 2FA switch.
     */
    const handleToggleTwoFactor = (shouldEnable: boolean) => {
        if (shouldEnable) {
            // Start enabling 2FA → show modal for the OTP
            setIsEnabling2FA(true);
            setShowModal(true);
            setIsOkDisabled(true);
            setOtpCode("");
        } else {
            // Simply disable 2FA (no modal needed, unless you want confirmation)
            disableTwoFactorAuth();
        }
    };

    /**
     * Actually disable 2FA.
     */
    const disableTwoFactorAuth = () => {
        setIsDisabling2FA(true)
        setTimeout(() => {
            setIsDisabling2FA(false);
            setTwoFactorAuthEnabled(false);
            setIsEnabling2FA(false);
        }, 2000)
    };

    /**
     * User clicked the "Verify" button inside the modal to check OTP validity.
     */
    const handleVerifyOtp = () => {
        if (otpCode.length !== 6) {
            setIsOtpValid(false);
            return;
        }

        setIsVerifying(true);

        // Simulate an API call to verify code
        setTimeout(() => {
            // Mock successful verification
            setIsVerifying(false);
            setIsOtpValid(true);
            setIsOkDisabled(false);
        }, 2000);
    };

    /**
     * User clicked "OK" in the modal after a successful verification → finalize enabling 2FA.
     */
    const handleOkModal = () => {
        setShowModal(false);
        setTwoFactorAuthEnabled(true);
        setIsEnabling2FA(false);
        setOtpCode("");
    };

    /**
     * User clicked "Cancel" in the modal → abort enabling 2FA.
     */
    const handleCancelModal = () => {
        setShowModal(false);
        setIsEnabling2FA(false);
        setTwoFactorAuthEnabled(false);
        setOtpCode("");
    };

    /**
     * Requesting a QR Code from the backend 
     */
    const requestOTPQRCodeData = () => {
        setQRCodeStatus("loading");
        setTimeout(() => {
            setQRCodeValue("https://google.com");
            setQRCodeStatus("active");
        }, 2000);
    }

    // ─────────────────────────────────────────────────────────────
    //  RENDER
    // ─────────────────────────────────────────────────────────────

    return (
        <div className={styles.settingsPage}>
            <h1 className={styles.settingsTitle}>Settings</h1>

            {/* SECURITY / 2FA Section */}
            <SettingsSection
                title="Security"
                label="Manage your security settings"
            >
                <ToggleSwitch
                    onChange={handleToggleTwoFactor}
                    checked={twoFactorAuthEnabled}
                    onDisabledChange={twoFactorAuthEnabled ? disableTwoFactorAuth : undefined}
                    loading={isEnabling2FA || isDisabling2FA}
                    switchMessage="Two Factor Authentication"
                    disabledMessage="Disable Two Factor Authentication"
                    disabled={twoFactorAuthEnabled}
                />
            </SettingsSection>

            {/* 2FA Modal */}
            <AuthModal
                showModal={showModal}
                onOk={handleOkModal}
                onCancel={handleCancelModal}
                onVerify={handleVerifyOtp}
                isVerifying={isVerifying}
                isOtpValid={isOtpValid}
                isOkDisabled={isOkDisabled}
                otpCode={otpCode}
                onOtpChange={setOtpCode}
                qrCodeValue="https://google.com"
                qrCodeErrorLevel="H"
                qrCodeStatus={qrCodeStatus}
                onQrRefresh={() => console.log("REFRESH")}
            />
        </div>
    );
};

export default SettingsPage;
