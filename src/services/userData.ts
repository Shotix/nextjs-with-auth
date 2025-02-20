

import { getUserFriendlyError } from "@/utils/errorMapper";
import { ApiErrorResponse } from "@/data/ApiErrorResponse";
import NetworkController from "@/utils/NetworkController";
import {ApiResponse, User} from "@/data/interfaces";

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
            needJwtToken: false,
        });
    } catch (error) {
        if (error instanceof ApiErrorResponse) {
            const userFriendlyMessage = getUserFriendlyError(error.message);
            return new ApiErrorResponse(
                userFriendlyMessage,
                error.statusCode,
                error.instance,
                error.errors
            );
        } else {
            throw error;
        }
    }
}


export async function registerRequest(
    username: string, 
    email: string,
    password: string
): Promise<ApiResponse<string> | ApiErrorResponse> {
    try {
        return await NetworkController.request<ApiResponse<string>>({
            headers: {
               
            },
            url: "/api/v1/users/register",
            method: "POST",
            body: { username, email, password },
            needJwtToken: false,
        });
    } catch (error) {
        if (error instanceof ApiErrorResponse) {
            const userFriendlyMessage = getUserFriendlyError(error.message);
            return new ApiErrorResponse(
                userFriendlyMessage,
                error.statusCode,
                error.instance,
                error.errors
            );
        } else {
            throw error;
        }
    }
}


export async function fetchUserData(): Promise<ApiResponse<User> | ApiErrorResponse> {
    try {
        return await NetworkController.request<ApiResponse<User>>({
            url: "/api/v1/users/me",
            method: "GET",
            needJwtToken: true,
        });
    } catch (error) {
        if (error instanceof ApiErrorResponse) {
            const userFriendlyMessage = getUserFriendlyError(error.message);
            return new ApiErrorResponse(
                userFriendlyMessage,
                error.statusCode,
                error.instance,
                error.errors
            );
        } else {
            throw error;
        }
    }
}