export const errorMessages: Record<string, string> = {
    "user.login.credentials.invalid": "Wrong username or password.",
    "network.error": "Unable to reach the server. Please check your internet connection and try again.",
};

export function getUserFriendlyError(errorCode: string): string {
    return errorMessages[errorCode] || "An unexpected error occurred. Please try again later.";
}