import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { IRequestConfig, ErrorResponse, SuccessResponse } from './contracts';

class Http {
    private http: AxiosInstance;

    constructor(httpService: typeof axios) {
        const TIMEOUT = 10000;
        this.http = httpService.create({
            timeout: TIMEOUT,
        });
    }

    async get<T = any>(url: string, config?: IRequestConfig): Promise<SuccessResponse | ErrorResponse> {
        return this.http.get<T>(url, config).then(Http.handleSuccess).catch(Http.handleError);
    }

    async post<T = any>(url: string, data: any, config?: IRequestConfig): Promise<SuccessResponse | ErrorResponse> {
        return this.http.post<T>(url, data, config).then(Http.handleSuccess).catch(Http.handleError);
    }

    async put<T = any>(url: string, data: any, config?: IRequestConfig): Promise<SuccessResponse | ErrorResponse> {
        return this.http.put<T>(url, data, config).then(Http.handleSuccess).catch(Http.handleError);
    }

    async patch<T = any>(url: string, data: any, config?: IRequestConfig): Promise<SuccessResponse | ErrorResponse> {
        return this.http.patch<T>(url, data, config).then(Http.handleSuccess).catch(Http.handleError);
    }

    async delete<T = any>(url: string, data: any, config?: IRequestConfig) {
        return this.http
            .delete<T>(url, { data, ...config })
            .then(Http.handleSuccess)
            .catch(Http.handleError);
    }

    private static handleSuccess(response: AxiosResponse): SuccessResponse {
        const { status, data, headers } = response;
        return {
            statusCode: status,
            data,
            headers,
            error: null,
        };
    }

    private static handleError(error: AxiosError): ErrorResponse {
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
