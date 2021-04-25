import { IApiConfig, RequestResult, RequestResultError, KnownHeaders } from '../contracts';
import { v4 as uuidv4 } from 'uuid';
import http from '../../http';

export default abstract class BaseModule {
    constructor(private _http: typeof http, private _config: IApiConfig) {}

    protected async _get<TReturn extends any = any>(url: string): Promise<RequestResult<TReturn>> {
        const xCorrelationID = this._generateXCorrelationID();
        return this._invoke(
            this._http.getJson(`${this._config.baseUrl}${url}`, this._getConfig(xCorrelationID)),
            xCorrelationID,
        );
    }

    protected async _post<TReturn extends any = any, TData extends {} = {}>(
        url: string,
        data: TData,
    ): Promise<RequestResult<TReturn>> {
        const xCorrelationID = this._generateXCorrelationID();
        return this._invoke(
            this._http.postJson(`${this._config.baseUrl}${url}`, data, this._getConfig(xCorrelationID)),
            xCorrelationID,
        );
    }

    protected async _put<TReturn extends any = any, TData extends {} = {}>(
        url: string,
        data: TData,
    ): Promise<RequestResult<TReturn>> {
        const xCorrelationID = this._generateXCorrelationID();
        return this._invoke(
            this._http.putJson(`${this._config.baseUrl}${url}`, data, this._getConfig(xCorrelationID)),
            xCorrelationID,
        );
    }

    protected async _patch<TReturn extends any = any, TData extends {} = {}>(
        url: string,
        data: TData,
    ): Promise<RequestResult<TReturn>> {
        const xCorrelationID = this._generateXCorrelationID();
        return this._invoke(
            this._http.patchJson(`${this._config.baseUrl}${url}`, data, this._getConfig(xCorrelationID)),
            xCorrelationID,
        );
    }

    protected async _delete<TReturn extends any = any, TData extends {} = {}>(
        url: string,
        data?: TData,
    ): Promise<RequestResult<TReturn>> {
        const xCorrelationID = this._generateXCorrelationID();
        return this._invoke(
            this._http.deleteJson(`${this._config.baseUrl}${url}`, data, this._getConfig(xCorrelationID)),
            xCorrelationID,
        );
    }

    private async _invoke<TReturn extends any = any>(
        invokedMethod: Promise<any>,
        xCorrelationID: string,
    ): Promise<RequestResult<TReturn>> {
        try {
            const data = await invokedMethod;
            return {
                data,
                error: null,
            };
        } catch (error) {
            const errorData: RequestResultError['error'] = ((): RequestResultError['error'] => {
                const headers: KnownHeaders = {};
                error.headers &&
                    (error.headers as Headers).forEach((value, key) => {
                        headers[key as keyof KnownHeaders] = value;
                    });
                return {
                    xCorrelationID,
                    statusCode: error.status,
                    headers,
                };
            })();
            const headers: KnownHeaders = {};
            error.headers &&
                (error.headers as Headers).forEach((value, key) => {
                    headers[key as keyof KnownHeaders] = value;
                });
            return {
                data: null,
                error: errorData,
            };
        }
    }

    private _getConfig(xCorrelationID: string): Partial<IApiConfig> {
        return {
            headers: {
                ...this._config.headers,
                'X-Correlation-ID': xCorrelationID,
            },
        };
    }

    private _generateXCorrelationID(): string {
        return uuidv4();
    }
}
