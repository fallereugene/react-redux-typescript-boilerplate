/* eslint-disable */
import { ResponseStatus } from '@/constants';

// базовые данные ответа
export type BaseRequestResult<TStatusCode extends ResponseStatus> = {
    // статус ответа
    statusCode: TStatusCode;
    // идентификатор запроса
    xCorrelationID: string;
    // заголовки ответа
    headers: { [key: string]: string };
};

// ------------------------- SUCCESS RESPONSE -------------------------

export interface IRequestResultSuccess<TData> extends BaseRequestResult<ResponseStatus.s200 | ResponseStatus.s204> {
    // данные ответа
    data: TData;
    // данные ошибки
    error: null;
}

// ------------------------- ERROR RESPONSE -------------------------

// базовые данные ответа ошибки
export interface IBaseRequestResultError<TStatusCode extends ResponseStatus, TErrorData>
    extends BaseRequestResult<TStatusCode> {
    // данные ответа
    data: null;
    // данные ошибки
    error: TErrorData;
}

export type RequestResultOtherErrors = IBaseRequestResultError<
    | ResponseStatus.s400 // нарушен контракт (ошибка модели)
    | ResponseStatus.s401
    | ResponseStatus.s403
    | ResponseStatus.s404
    | ResponseStatus.s500,
    {}
>;

// ------------------------- RequestResult -------------------------

// export type RequestResultSuccess<TData> = RequestResultSuccess200<TData> | RequestResultSuccess204;
export type RequestResultSuccess<TData> = IRequestResultSuccess<TData>;
export type RequestResultError = RequestResultOtherErrors;

export type RequestResult<TData> = RequestResultSuccess<TData> | RequestResultError;
