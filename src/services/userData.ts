import {ApiResponse, User} from "@/data/interfaces";
import {ApiErrorResponse} from "@/data/ApiErrorResponse";
import NetworkController from "@/utils/NetworkController";


export async function loginRequest(
    username: string,
    password: string
): Promise<ApiResponse<string> | ApiErrorResponse> {
    try {
        return await NetworkController.request<ApiResponse<string>>({
            headers: {
                "X-Api-Key": "X-Api-Key",
            },
            url: "/api/v1/users/login",
            method: "POST",
            body: { username, password },
            needJwtToken: false
        });
    } catch (error) {
        if (error instanceof Response) {
            const errorResponse = await error.json();
            return new ApiErrorResponse(
                errorResponse.message,
                errorResponse.statusCode,
                errorResponse.instance,
                errorResponse.errors
            );
        } else {
            throw error;
        }
    }
}


export async function fetchUserData(): Promise<ApiResponse<User>> {
    return NetworkController.request<ApiResponse<User>>({
        url: "/api/user",
        method: "GET",
        needJwtToken: true
    })
}