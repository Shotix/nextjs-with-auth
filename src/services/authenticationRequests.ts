export async function refreshAccessTokenRequest(): Promise<string | null> {
    try {
        const fullUrl = "http://localhost:8080/api/v1/auth/refresh";
        
        // Default headers
        const defaultHeaders: Record<string, string> = {
            "Content-Type": "application/json",
        };
        
        // Check if the cookie is present
        console.log("Access Token:", document.cookie);
        
        const options: RequestInit = {
            method: "POST",
            headers: { ...defaultHeaders },
            credentials: "include" // Ensure cookies are included in the request
        };
        
        console.log("Request URL:", fullUrl);
        
        const res = await fetch(fullUrl, options);

        // Log the request headers to check if cookies are being sent
        console.log("Request Headers:", res.headers);

        if (!res.ok) {
            return null;
        }
        const data = await res.json();
        return data.accessToken;
    } catch (error) {
        console.error("Refresh token request failed:", error);
        return null;
    }
}