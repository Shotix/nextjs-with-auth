import {useQuery} from "@tanstack/react-query";
import {ApiResponse, User} from "@/data/interfaces";
import {fetchUserData} from "@/services/userData";

export function usePersonalData(options?: { enabled?: boolean }) {
    return useQuery<ApiResponse<User>>({
        queryKey: ["personalData"],
        queryFn: fetchUserData,
        enabled: options?.enabled ?? true,
    });
}