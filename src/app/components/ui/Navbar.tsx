"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaHome, FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import styles from "../../css/navbar.module.css";
import {useUser} from "@/contexts/UserContext";
import {useAuth} from "@/contexts/AuthContext";
import {useRouter} from "next/navigation";

export default function Navbar() {
    const { user } = useUser();
    const { logout } = useAuth();
    const router = useRouter();
    
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
                        <p>{user?.username}</p>
                    </span>
                )}
            </section>

            <hr className={styles.hr} />

            <section className={styles.main}>
                <div 
                    className={styles.navItem} 
                    onClick={() => router.push("/")}
                >
                    <span className={styles.navIcon}>
                        <FaHome />
                    </span>
                    {!collapsed && <span className={styles.navText}>Dashboard</span>}
                </div>
                {/* Add more nav items here */}
            </section>

            <hr className={styles.hr} />

            <section className={styles.others}>
                <div 
                    className={styles.navItem}
                    onClick={() => router.push("/settings")}
                >
                    <span className={styles.navIcon}>
                        <FaGear />
                    </span>
                    {!collapsed && <span className={styles.navText}>Settings</span>}
                </div>
                <div 
                    className={styles.navItem}
                    onClick={logout}
                >
                    <span className={styles.navIcon}>
                        <TbLogout />
                    </span>
                    {!collapsed && <span className={styles.navText}>Logout</span>}
                </div>
            </section>

            <button className={styles.toggle} onClick={toggleNavbar}>
                {collapsed && (
                    <span className={styles.navCollapseIconCollapsed}>
                        <FaCaretRight/>
                    </span>
                )}
                {!collapsed && (
                    <span className={styles.navCollapseIcon}>
                        <FaCaretLeft/>
                    </span>
                )}
            </button>
        </nav>
    );
}