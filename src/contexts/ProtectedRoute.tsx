import React, {useEffect} from "react";
import {useAuth} from "@/contexts/AuthContext";
import {usePathname, useRouter} from "next/navigation";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            if (!pathname.startsWith("/login") && !pathname.startsWith("/register")) {
                router.push("/login");
            }
        }
    }, [isAuthenticated, loading, pathname, router]);

    if (loading) {
        return <p>Loading...</p>
    }

    if (!isAuthenticated && pathname === "/login" || pathname === "/register") {
        return <>{children}</>;
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;