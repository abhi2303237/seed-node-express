export interface ResponseDto<T> {
    statusCode?: number;
    status: boolean;
    data?: T;
    message?: string;
    error?: any;
}