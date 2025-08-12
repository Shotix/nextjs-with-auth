import React, {useEffect} from "react";
import {useAuth} from "@/contexts/AuthContext";
import {usePathname, useRouter} from "next/navigation";
import {useUser} from "@/contexts/UserContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, loading: authLoading, accessToken } = useAuth();
    const { isLoading: userIsLoading, user} = useUser();
    const router = useRouter();
    const pathname = usePathname();

    const isLoading = authLoading || (isAuthenticated && accessToken && userIsLoading);

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated || !accessToken) {
                if (pathname !== "/login") {
                    router.push("/login");
                }
            } else {
                if (pathname === "/login") {
                    router.push("/");
                }
            }
        }
    }, [isAuthenticated, accessToken, isLoading, pathname, router, user]);


    if (isLoading && pathname !== "/login") { // Show loading for protected routes
        return (
            <main>
                Loading...
            </main>
        );
    }

    if (pathname === "/login") {
        if (!isAuthenticated && !authLoading) {
            return <>{children}</>;
        }
        return (
            <main>
                Loading...
            </main>
        );
    }

    if (isAuthenticated && accessToken && !isLoading) {
        return <>{children}</>;
    }

    return null;
};

export default ProtectedRoute;