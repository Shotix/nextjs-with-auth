import {useQuery} from "@tanstack/react-query";
import {ApiResponse, User} from "@/data/interfaces";
import {fetchUserData} from "@/services/userData";

export function usePersonalData() {
    return useQuery<ApiResponse<User>>({
        queryKey: ["personalData"],
        queryFn: fetchUserData,
    });
}