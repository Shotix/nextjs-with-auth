"use client";

import React from "react";
import {AuthProvider} from "@/contexts/AuthContext";
import ProtectedRoute from "@/contexts/ProtectedRoute";
import "./globals.css"
import {QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {QueryClient} from "@tanstack/query-core";
import {UserProvider} from "@/contexts/UserContext";
import {usePathname} from "next/navigation";

const queryClient = new QueryClient;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    return (
        <html lang="en">
        <body>
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <UserProvider>
                    <ProtectedRoute>
                        <main>
                            {children}
                        </main>
                        <ReactQueryDevtools initialIsOpen={false}/>
                    </ProtectedRoute>
                </UserProvider>
            </QueryClientProvider>
        </AuthProvider>
        </body>
        </html>
    );
}
