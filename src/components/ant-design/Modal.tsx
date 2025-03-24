import {ButtonProps, Modal} from 'antd';
import React from 'react';

interface ModalProps {
    title: string,
    style?: React.CSSProperties,
    open: boolean,
    onOk: () => void,
    okText?: string,
    okButtonProps?: ButtonProps, 
    cancelButtonProps?: ButtonProps,
    cancelText?: string,
    confirmLoading?: boolean,
    onCancel: () => void,
    items?: never,
    position?: 'center'
    width?: number
}

const ModalComponent: React.FC<ModalProps> = ({ 
                                                  title, 
                                                  style, 
                                                  open, 
                                                  onOk, 
                                                  okText, 
                                                  okButtonProps,
                                                  cancelButtonProps,
                                                  cancelText, 
                                                  confirmLoading,
                                                  onCancel, 
                                                  children, 
                                                  position, 
                                                  width 
}) => {
    return (
        <Modal
            title={title}
            open={open}
            onOk={onOk}
            okText={okText || 'Ok'}
            cancelText={cancelText || 'Cancel'}
            onCancel={onCancel}
            style={style}
            okButtonProps={okButtonProps}
            cancelButtonProps={cancelButtonProps}
            confirmLoading={confirmLoading}
            centered={position === 'center'}
            width={width}
        >
            <p>Test</p>
        </Modal>
    )
}

export default ModalComponent
