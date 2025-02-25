export let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
    accessToken = token;
};