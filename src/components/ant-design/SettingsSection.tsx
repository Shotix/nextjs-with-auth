import { Collapse, Divider } from 'antd';
import React from "react";

interface SettingsSectionProps {
    orientation?: "left" | "right";
    size?: "small" | "middle" | "large";
    title: string;
    label: string;
    children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
    orientation = "left",
    size = "middle",
    title,
    label,
    children
                                                         }) => {
    return (
        <>
            <Divider orientation={orientation}>{title}</Divider>
            <Collapse size={size}>
                <Collapse.Panel key={1} header={label}>
                    {children}
                </Collapse.Panel>
            </Collapse>
        </>
    )
}

export default SettingsSection;