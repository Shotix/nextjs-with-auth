import React, { useState, useEffect } from "react";
import { Button, Modal, QRCode, Space } from "antd";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import {REGEXP_ONLY_DIGITS} from "input-otp";
import {QRStatus} from "antd/es/qr-code/interface";

interface AuthModalProps {
    showModal: boolean;
    onOk: () => void;
    onCancel: () => void;
    onVerify: () => void;
    isVerifying: boolean;
    isOtpValid: boolean;
    isOkDisabled: boolean;
    otpCode: string;
    onOtpChange: (value: string) => void;
    qrCodeValue: string;
    qrCodeErrorLevel: "L" | "M" | "Q" | "H";
    qrCodeStatus: QRStatus;
    qrCodeTimeToLive: number;
    onQrRefresh: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
                                                 showModal,
                                                 onOk,
                                                 onCancel,
                                                 onVerify,
                                                 isVerifying,
                                                 isOtpValid,
                                                 isOkDisabled,
                                                 otpCode,
                                                 onOtpChange,
                                                 qrCodeValue,
                                                 qrCodeErrorLevel,
                                                 qrCodeStatus,
                                                 qrCodeTimeToLive,
                                                 onQrRefresh,
                                             }) => {
    // We can track whether the "Verify" button is enabled based on code length.
    // Alternatively, we could let the parent handle everything if we prefer one source of truth.
    const [isVerifyDisabled, setIsVerifyDisabled] = useState(true);

    useEffect(() => {
        setIsVerifyDisabled(otpCode.length !== 6);
    }, [otpCode]);

    return (
        <Modal
            title="Enable 2FA"
            open={showModal}
            onOk={onOk}
            onCancel={onCancel}
            okText="Enable 2FA"
            okButtonProps={{ disabled: isOkDisabled }}
        >
            <Space direction="vertical">
                <p>
                    Scan the QR code below with your authenticator app and enter the
                    6-digit code to enable 2FA.
                </p>

                <QRCode
                    errorLevel={qrCodeErrorLevel}
                    value={qrCodeValue}
                    status={qrCodeStatus}
                    onRefresh={onQrRefresh}
                />

                {qrCodeStatus === "active" && (
                    <p>
                        This QR code will expire in {qrCodeTimeToLive} seconds.
                    </p>
                )}

                <Space direction="horizontal">
                    <InputOTP
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS}
                        value={otpCode}
                        onChange={(value) => onOtpChange(value)}
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>

                    <Button
                        type="primary"
                        loading={isVerifying}
                        disabled={isVerifyDisabled}
                        // If invalid code was typed previously, show an error color or similar
                        danger={!isOtpValid}
                        onClick={onVerify}
                    >
                        Verify
                    </Button>
                </Space>

                {!isOtpValid && (
                    <p className="error">
                        The code you entered is invalid. Please try again.
                    </p>
                )}
            </Space>
        </Modal>
    );
};

export default AuthModal;