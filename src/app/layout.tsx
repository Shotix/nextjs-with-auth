"use client";

import React from "react";
import {AuthProvider} from "@/contexts/AuthContext";
import ProtectedRoute from "@/contexts/ProtectedRoute";
import "./globals.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <AuthProvider>
            <ProtectedRoute>
                    <main>{children}</main>
            </ProtectedRoute>
        </AuthProvider>
        </body>
        </html>
    );
}
