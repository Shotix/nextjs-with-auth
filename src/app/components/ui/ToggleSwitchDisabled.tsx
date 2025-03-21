import React from 'react';
import { Button, Space, Switch } from 'antd';

interface ToggleSwitchDisabledProps {
    onChange: (checked: boolean) => void;
    onDisabledChange: (disabled: boolean) => void;
    disabled: boolean;
    disabledMessage?: string;
    switchMessage?: string;
}

const App: React.FC<ToggleSwitchDisabledProps> = ({onChange, onDisabledChange, disabled, disabledMessage, switchMessage}) => {
    const toggle = () => {
        onDisabledChange(!disabled);
    };

    return (
        <Space direction="vertical">
            <Space direction="horizontal">
                <Switch
                    disabled={disabled}
                    defaultChecked
                    onChange={onChange}
                />
                <span>{switchMessage ? switchMessage : 'Switch'}</span>
            </Space>
            <Button type="primary" onClick={toggle}>
                {disabledMessage ? disabledMessage : 'Toggle Switch'}
            </Button>
        </Space>
    );
};

export default App;