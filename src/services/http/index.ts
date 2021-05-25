import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { IRequestConfig, ErrorResponse, SuccessResponse } from './contracts';

class Http {
    private _http: AxiosInstance;

    constructor(httpService: typeof axios) {
        const TIMEOUT = 10000;
        this._http = httpService.create({
            timeout: TIMEOUT,
        });
    }

    async get<T = any>(url: string, config?: IRequestConfig): Promise<SuccessResponse | ErrorResponse> {
        return this._http.get<T>(url, config).then(this._handleSuccess).catch(this._handleError);
    }

    async post<T = any>(url: string, data: any, config?: IRequestConfig): Promise<SuccessResponse | ErrorResponse> {
        return this._http.post<T>(url, data, config).then(this._handleSuccess).catch(this._handleError);
    }

    async put<T = any>(url: string, data: any, config?: IRequestConfig): Promise<SuccessResponse | ErrorResponse> {
        return this._http.put<T>(url, data, config).then(this._handleSuccess).catch(this._handleError);
    }

    async patch<T = any>(url: string, data: any, config?: IRequestConfig): Promise<SuccessResponse | ErrorResponse> {
        return this._http.patch<T>(url, data, config).then(this._handleSuccess).catch(this._handleError);
    }

    async delete<T = any>(url: string, data: any, config?: IRequestConfig) {
        return this._http
            .delete<T>(url, { data, ...config })
            .then(this._handleSuccess)
            .catch(this._handleError);
    }

    private _handleSuccess(response: AxiosResponse): SuccessResponse {
        const { status, data, headers } = response;
        return {
            statusCode: status,
            data,
            headers,
            error: null,
        };
    }

    private _handleError(error: AxiosError): ErrorResponse {
        if (error.response) {
            const { status, headers } = error.response;
            // client received an error response (5xx, 4xx)
            return {
                error,
                statusCode: status,
                data: null,
                headers,
            };
        }
        throw error;
    }
}

export default new Http(axios);
