interface User {
    id: number,
    username: string,
}




interface ApiResponse<T> {
    message: string;
    statusCode: number;
    data: T;
}

interface ApiErrorDetails {
    pointer?: string;
    reason: string;
}

interface ApiListPaginationSuccess<T> {
    meta: PaginationMeta;
    data: T[];
    links: PaginationLink;
}

interface PaginationLink {
    selfLink: string,
    first: string,
    last: string,
    next: string,
    previous: string,
}

interface PaginationMeta {
    currentPage: number,
    pageSize: number,
    totalPages: number,
    totalItems: number,
    sortedBy: string
}

export type {
    User,
    ApiResponse,
    ApiErrorDetails,
    ApiListPaginationSuccess,
    PaginationLink,
    PaginationMeta
}