"use client";
import React, { useState } from "react";
import styles from "../../css/settingsSection.module.css";

interface SettingsSectionProps {
    title: string;
    children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children }) => {
    const [expanded, setExpanded] = useState(true);

    return (
        <div className={styles.settingsSection}>
            <div
                className={styles.sectionHeader}
                onClick={() => setExpanded((prev) => !prev)}
            >
                <h2 className={styles.headerTitle}>{title}</h2>
                <span
                    className={`${styles.sectionHeaderIcon} ${
                        expanded ? styles.notRotated : styles.rotated
                    }`}
                >
          ▼
        </span>
            </div>
            <div
                className={`${styles.sectionContent} ${
                    expanded ? styles.expanded : styles.collapsed
                }`}
            >
                {children}
            </div>
        </div>
    );
};

export default SettingsSection;