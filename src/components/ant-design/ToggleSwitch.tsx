import React from "react";
import {Button, Space, Switch} from "antd";

interface ToggleSwitchProps {
    onChange: (checked: boolean) => void;
    onDisabledChange?: (disabled: boolean) => void;
    checked: boolean;
    disabled: boolean;
    loading?: boolean;
    disabledMessage?: string;
    switchMessage?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({onChange, onDisabledChange, loading, checked, disabled, switchMessage, disabledMessage}) => {
    return (
        <Space direction="vertical">
            <Space direction="horizontal">
                <Switch
                    disabled={disabled}
                    checked={checked}
                    onChange={onChange}
                    loading={loading}
                />
                <span>{switchMessage ? switchMessage : 'Switch'}</span>
            </Space>
            {onDisabledChange && (
                <Button type="primary" onClick={() => onDisabledChange(!disabled)}>
                    {disabledMessage ? disabledMessage : 'Toggle Switch'}
                </Button>
            )}
        </Space>
    )
}

export default ToggleSwitch;