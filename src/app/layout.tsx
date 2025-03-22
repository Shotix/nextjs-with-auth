"use client";

import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/contexts/ProtectedRoute";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient } from "@tanstack/query-core";
import { UserProvider } from "@/contexts/UserContext";
import Navbar from "@/components/custom/Navbar";
import { Inter } from 'next/font/google'
import {usePathname} from "next/navigation";
import '@ant-design/v5-patch-for-react-19';
import {App} from "antd";

const queryClient = new QueryClient();
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/login";
    const isRegisterPage = pathname === "/register";
    
    return (
        <html lang="en" className={inter.className}>
        <body>
        <App>
            <AuthProvider>
                <ProtectedRoute>
                    <QueryClientProvider client={queryClient}>
                        {(isLoginPage || isRegisterPage) && (
                            <main>
                                {children}
                            </main>
                        )}
                        {(!isLoginPage && !isRegisterPage) && (
                            <UserProvider>
                                <div className="app-container">
                                    <Navbar />
                                    <main>{children}</main>
                                </div>
                            </UserProvider>
                        )}
                        <ReactQueryDevtools initialIsOpen={false} />
                    </QueryClientProvider>
                </ProtectedRoute>
            </AuthProvider>
        </App>
        </body>
        </html>
    );
}
