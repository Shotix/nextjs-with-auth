import React from "react";
import {Modal, QRCode, Space} from "antd";
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp";

interface AuthModalProps {
    showModal: boolean;
    okModal: () => void;
    cancelModal: () => void;
    confirmLoading: boolean;
    okButtonProps: {disabled: boolean};
    value: string;
    setOTPValue: (value: string) => void;
    qrCodeValue: string;
    qrCodeErrorLevel: "L" | "M" | "Q" | "H";
    qrCodeStatus: "loading" | "expired" | "scanned" | "active"
    qrStatusOnRefresh: () => void;
}


const AuthModal:React.FC<AuthModalProps> = ({
    showModal,
    okModal,
    cancelModal,
    confirmLoading,
    okButtonProps,
    value,
    setOTPValue,
    qrCodeValue,
    qrCodeErrorLevel,
    qrCodeStatus,
    qrStatusOnRefresh
                                            }) => {
    return (
        <Modal
            title={"Enable 2FA"}
            open={showModal}
            onOk={okModal}
            okButtonProps={okButtonProps}
            onCancel={cancelModal}
            confirmLoading={confirmLoading}
        >
            <Space direction={"vertical"}>

                <p>
                    Scan the QR code below with your authenticator app and enter the 6-digit code to enable 2FA.
                </p>

                <QRCode
                    errorLevel={qrCodeErrorLevel}
                    value={qrCodeValue}
                    status={qrCodeStatus}
                    onRefresh={qrStatusOnRefresh}
                />

                <InputOTP
                    maxLength={6}
                    value={value}
                    onChange={(value) => {setOTPValue(value)}}
                >
                    <InputOTPGroup>
                        <InputOTPSlot index={0}/>
                        <InputOTPSlot index={1}/>
                        <InputOTPSlot index={2}/>
                        <InputOTPSlot index={3}/>
                        <InputOTPSlot index={4}/>
                        <InputOTPSlot index={5}/>
                    </InputOTPGroup>
                </InputOTP>
            </Space>
        </Modal>
    )
}

export default AuthModal;