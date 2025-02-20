import { ApiErrorResponse } from "@/data/ApiErrorResponse";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions {
    url: string;
    method: HttpMethod;
    headers?: Record<string, string>;
    body?: Record<string, unknown>;
    needJwtToken?: boolean;
}

export default class NetworkController {
    private static baseUrl = "http://localhost:8080";

    static async request<T>({
                                url,
                                method,
                                headers = {},
                                body,
                                needJwtToken = false,
                            }: RequestOptions): Promise<T> {
        const fullUrl = `${this.baseUrl}${url}`;

        // Default headers
        const defaultHeaders: Record<string, string> = {
            "Content-Type": "application/json",
        };

        // Add JWT Token if required
        if (needJwtToken) {
            const token = localStorage.getItem("authToken");
            if (token) {
                defaultHeaders["Authorization"] = `Bearer ${token}`;
            } else {
                throw new ApiErrorResponse("authentication.token.missing", 401, "", []);
            }
        }

        // Prepare the request options
        const options: RequestInit = {
            method,
            headers: { ...defaultHeaders, ...headers },
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        // Log the request details
        console.log("Request URL:", fullUrl);
        console.log("Request Options:", options);

        try {
            // Execute the request
            const response = await fetch(fullUrl, options);

            // Log the response details
            console.log("Response Status:", response.status);
            console.log("Response Headers:", response.headers);

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new ApiErrorResponse(
                    errorResponse.message,
                    errorResponse.statusCode,
                    errorResponse.instance,
                    errorResponse.errors
                );
            }

            const responseData = await response.json();
            console.log("Response Data:", responseData);
            return responseData;
        } catch (error) {
            console.error("Request failed:", error);
            // If the error is a network error (e.g., no internet) we wrap it in our ApiErrorResponse type
            if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
                throw new ApiErrorResponse("network.error", 0, "", []);
            }
            throw error;
        }
    }
}