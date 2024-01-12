import { HttpStatus } from '@constants/http-status';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

interface ApiErrorData {
    message?: string;
    statusCode?: HttpStatus;
    error?: string;
}

export type ApiErrorResponse<T = FetchBaseQueryError | SerializedError> = {
    status: HttpStatus;
    data: ApiErrorData;
} & T;
