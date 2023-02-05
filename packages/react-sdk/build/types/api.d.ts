export type ResponseError = {
    message: string;
    stack?: string;
};
export type GenericResponse = {
    data?: Record<string, any>;
    errors?: ResponseError[];
};
export interface VerifiedResponse extends GenericResponse {
    data?: {
        valid: boolean;
        organization: string;
    };
}
export interface AuthResponse extends GenericResponse {
    data?: {
        token: string;
    };
}
export type CacheCowStream = {
    socket: string;
    muName: string;
};
export interface StreamsResponse extends GenericResponse {
    data?: {
        streams: CacheCowStream[];
    };
}
