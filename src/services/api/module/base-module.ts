import { IApiConfig, RequestResult } from '../contracts';
import { v4 as uuidv4 } from 'uuid';
import http from '../../http';

export default abstract class BaseModule {
    constructor(private _http: typeof http, private _config: IApiConfig) {}

    protected async _get<TReturn extends any = any>(url: string): Promise<RequestResult<TReturn>> {
        const xCorrelationID = this._generateXCorrelationID();
        return this._invoke(
            this._http.get(`${this._config.baseUrl}${url}`, this._getConfig(xCorrelationID)),
            xCorrelationID,
        );
    }

    protected async _post<TReturn extends any = any, TData extends {} = {}>(
        url: string,
        data: TData,
    ): Promise<RequestResult<TReturn>> {
        const xCorrelationID = this._generateXCorrelationID();
        return this._invoke(
            this._http.post(`${this._config.baseUrl}${url}`, data, this._getConfig(xCorrelationID)),
            xCorrelationID,
        );
    }

    protected async _put<TReturn extends any = any, TData extends {} = {}>(
        url: string,
        data: TData,
    ): Promise<RequestResult<TReturn>> {
        const xCorrelationID = this._generateXCorrelationID();
        return this._invoke(
            this._http.put(`${this._config.baseUrl}${url}`, data, this._getConfig(xCorrelationID)),
            xCorrelationID,
        );
    }

    protected async _patch<TReturn extends any = any, TData extends {} = {}>(
        url: string,
        data: TData,
    ): Promise<RequestResult<TReturn>> {
        const xCorrelationID = this._generateXCorrelationID();
        return this._invoke(
            this._http.patch(`${this._config.baseUrl}${url}`, data, this._getConfig(xCorrelationID)),
            xCorrelationID,
        );
    }

    protected async _delete<TReturn extends any = any, TData extends {} = {}>(
        url: string,
        data?: TData,
    ): Promise<RequestResult<TReturn>> {
        const xCorrelationID = this._generateXCorrelationID();
        return this._invoke(
            this._http.delete(`${this._config.baseUrl}${url}`, data, this._getConfig(xCorrelationID)),
            xCorrelationID,
        );
    }

    private async _invoke<TReturn extends any = any>(
        invokedMethod: Promise<any>,
        xCorrelationID: string,
    ): Promise<RequestResult<TReturn>> {
        const { statusCode, headers, data, error } = await invokedMethod;
        if (error) {
            return {
                statusCode,
                xCorrelationID,
                headers,
                data: null,
                error: {},
            };
        }
        return { statusCode, xCorrelationID, headers, data, error };
    }

    private _getConfig(xCorrelationID: string): Partial<IApiConfig> {
        return {
            headers: {
                ...this._config.headers,
                'X-Correlation-ID': xCorrelationID,
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
        };
    }

    private _generateXCorrelationID(): string {
        return uuidv4();
    }
}
