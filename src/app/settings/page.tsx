"use client";
import React, {useEffect, useState} from "react";
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
    const [qrCodeValue, setQRCodeValue] = useState("https://google.com");
    const [qrCodeStatus, setQRCodeStatus] = useState<QRStatus>("active" as QRStatus);
    const [qrQRCodeTimeToLive, setQRCodeTimeToLive] = useState<number>(30);

    // OTP Verification States
    const [otpCode, setOtpCode] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [isOtpValid, setIsOtpValid] = useState(true);
    const [isOkDisabled, setIsOkDisabled] = useState(true);



    // ─────────────────────────────────────────────────────────────
    //  QR CODE TTL / COUNTDOWN
    // ─────────────────────────────────────────────────────────────
    /**
     * Every time the modal opens with an "active" QR, we start a timer that decrements
     * the countdown. If countdown hits 0, we set the QR status to "expired".
     */
    useEffect(() => {
        if (showModal && qrCodeStatus === "active") {
            // Reset countdown each time we re-activate the QR or re-open the modal
            setQRCodeTimeToLive(30);

            const timer = setInterval(() => {
                setQRCodeTimeToLive((prev) => {
                    console.log(prev);
                    if (prev <= 1) {
                        clearInterval(timer);
                        setQRCodeStatus("expired");
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            // Cleanup the interval if modal closes or status changes
            return () => clearInterval(timer);
        }
    }, [showModal, qrCodeStatus]);

    /**
     * This is called when the user clicks “Refresh” in the AuthModal’s QR code
     * (or anywhere else you want them to request a new key from the backend).
     */
    const handleQrRefresh = () => {
        // Here you would do an API call to get a fresh secret from your backend
        // and update the `qrCodeValue` with that new secret.
        // For now, we’ll just simulate a refresh by setting the code and resetting the status:
        setQRCodeStatus("active");
        setQRCodeTimeToLive(30);
    };
    

    // ─────────────────────────────────────────────────────────────
    //  EVENT HANDLERS
    // ─────────────────────────────────────────────────────────────

    /**
     * Called whenever the user toggles the 2FA switch.
     */
    const handleToggleTwoFactor = (shouldEnable: boolean) => {
        if (shouldEnable) {
            // Start enabling 2FA → show modal for the OTP
            requestOTPQRCodeData();
            setIsEnabling2FA(true);
            setShowModal(true);
            setIsOkDisabled(true);
            setOtpCode("");
        } else {
            // Disable 2FA (no modal needed, unless you want confirmation)
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
                qrCodeValue={qrCodeValue}
                qrCodeErrorLevel="H"
                qrCodeStatus={qrCodeStatus}
                qrCodeTimeToLive={qrQRCodeTimeToLive}
                onQrRefresh={handleQrRefresh}
            />
        </div>
    );
};

export default SettingsPage;
