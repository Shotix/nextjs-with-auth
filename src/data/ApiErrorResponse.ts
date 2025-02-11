import {ApiErrorDetails} from "@/data/interfaces";

export class ApiErrorResponse {
    constructor(
        public message: string,
        public statusCode: number,
        public instance: string,
        public errors: ApiErrorDetails[]
    ) {
    }
}