"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaHome, FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import styles from "../../css/navbar.module.css";

export default function Navbar() {
    const [collapsed, setCollapsed] = useState(false);
    const toggleNavbar = () => setCollapsed((prev) => !prev);

    return (
        <nav className={`${styles.navbar} ${collapsed ? styles.collapsed : ""}`}>
            <section className={styles.profile}>
                <Image
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="avatar"
                    width={45}
                    height={45}
                    className={styles.avatar}
                />
                {!collapsed && (
                    <span className={styles.name}>
            <p>Shrinithi Murali</p>
            <p>Software Engineer</p>
          </span>
                )}
            </section>

            <hr className={styles.hr} />

            <section className={styles.main}>
                <div className={styles.navItem}>
          <span className={styles.navIcon}>
            <FaHome />
          </span>
                    {!collapsed && <span className={styles.navText}>Dashboard</span>}
                </div>
                {/* Add more nav items here */}
            </section>

            <hr className={styles.hr} />

            <section className={styles.others}>
                <div className={styles.navItem}>
          <span className={styles.navIcon}>
            <FaGear />
          </span>
                    {!collapsed && <span className={styles.navText}>Settings</span>}
                </div>
                {/* Additional items like help or logout can be added */}
            </section>

            <button className={styles.toggle} onClick={toggleNavbar}>
        <span className={`${styles.navIcon} ${collapsed ? styles.collapsed : ""}`}>
          {collapsed ? <FaCaretRight /> : <FaCaretLeft />}
        </span>
            </button>
        </nav>
    );
}