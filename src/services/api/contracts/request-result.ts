import { ResponseStatus } from '@/constants';

export type KnownHeaders = {
    location?: string;
};

export type RequestResultSuccess<TData extends {}> = {
    data: TData;
    error: null;
};

export interface IRequestResultOtherError {
    data: null;
    error: {
        xCorrelationID: string;
        statusCode: ResponseStatus;
        headers: KnownHeaders;
    };
}

export type RequestResultError = IRequestResultOtherError;

export type RequestResult<TData> = RequestResultSuccess<TData> | RequestResultError;
