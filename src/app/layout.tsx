"use client";

import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/contexts/ProtectedRoute";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient } from "@tanstack/query-core";
import { UserProvider } from "@/contexts/UserContext";
import Navbar from "@/app/components/ui/Navbar";
import { Inter } from 'next/font/google'

const queryClient = new QueryClient();
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.className}>
        <body>
        <AuthProvider>
            <ProtectedRoute>
                <QueryClientProvider client={queryClient}>
                    <UserProvider>
                        <div className="app-container">
                            <Navbar />
                            <main>{children}</main>
                        </div>
                    </UserProvider>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </ProtectedRoute>
        </AuthProvider>
        </body>
        </html>
    );
}
