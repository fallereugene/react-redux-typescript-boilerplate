import { IOptionsAPI, IRequestConfig } from './contracts';
import { DEFAULT_HEADERS, DEFAULT_OPTIONS, Method } from './constants';
import { NetworkError, ServerError, AuthenticationError } from './errors';
import Interceptor from './interceptor';

class Http extends Interceptor {
    private _options = DEFAULT_OPTIONS;
    private _headers = DEFAULT_HEADERS;

    setOptions(options: IOptionsAPI) {
        this._options = {
            ...this._options,
            ...options,
        };
    }

    getJson<T = any>(url: string, config?: IRequestConfig) {
        return this._fetchRequest<T>(Method.GET, url, null, config);
    }

    postJson<T = any>(url: string, data: any, config?: IRequestConfig) {
        return this._fetchRequest<T>(Method.POST, url, data, config);
    }

    putJson<T = any>(url: string, data: any, config?: IRequestConfig) {
        return this._fetchRequest<T>(Method.PUT, url, data, config);
    }

    patchJson<T = any>(url: string, data: any, config?: IRequestConfig) {
        return this._fetchRequest<T>(Method.PATCH, url, data, config);
    }

    deleteJson(url: string, data?: any, config?: IRequestConfig) {
        return this._fetchRequest(Method.DELETE, url, data, config);
    }

    private async _fetchRequest<T>(method: Method, url: string, data: any, config?: IRequestConfig) {
        const body = data ? JSON.stringify(data) : undefined;
        const headers = config && config.headers ? Object.assign({}, this._headers, config.headers) : this._headers;
        let request: RequestInit = {
            method,
            headers,
            body,
            credentials: `include`,
        };
        request = this.withOnFulfilled(request, this.interceptors.request);
        this._options.logRequests && console.warn(`[API] [Request] ${method}: ${url}`, body, request.headers);
        return fetch(url, request)
            .then((r) =>
                this._errorProcessing(r).then(async (er: any) => {
                    if (er) {
                        console.warn(
                            `[API] [Response] ERROR ${method}: ${url}`,
                            er.message,
                            JSON.stringify(er),
                            r.headers,
                        );
                        er = this.withOnRejected(er, this.interceptors.response);
                        throw er;
                    }
                    r = this.withOnFulfilled(r, this.interceptors.response);
                    let dataJsonString = '';
                    let dataJson = {} as T;
                    if (!config?.rawResponse) {
                        try {
                            dataJsonString = await r.text();
                            dataJson = dataJsonString ? JSON.parse(dataJsonString) : {};
                        } catch (e) {
                            throw new NetworkError(dataJsonString);
                        }
                    }
                    this._options.logResponse &&
                        console.warn(`[API] [Response] ${method}: ${url}`, dataJsonString, r.headers);
                    if (config?.rawResponse) {
                        const response: any = {
                            headers: r.headers,
                            response: r,
                            statusCode: r.status,
                        };
                        return response as T;
                    }
                    return dataJson;
                }),
            )
            .catch((e) =>
                this._errorProcessing(e)
                    .then((er) => this.withOnRejected(er, this.interceptors.response))
                    .then((er) => {
                        if (!er) {
                            er = new NetworkError('Unknown error');
                        }
                        if (this._options.logResponse && e !== er) {
                            console.warn(`[API] [Response] ERROR ${method}: ${url}`, er);
                        }
                        return Promise.reject(er);
                    }),
            );
    }

    private async _errorProcessing(response: Response | Error) {
        if (response instanceof Error) {
            return response;
        }
        const status = response.status;
        const r = response as any;
        if (r.name) {
            return response;
        }
        let jsonData = null;
        let message = '';
        if (status >= 400 && status <= 510) {
            try {
                jsonData = await response.json();
            } catch (_) {
                try {
                    message = await response.text();
                } catch (_) {
                    // ignore
                }
            }
        }
        if (status === 401 || status === 403) {
            const challenge = this.getChallenge(response);
            return new AuthenticationError(response.status, jsonData, challenge, response.headers);
        }
        if (response.status >= 400 && response.status <= 510) {
            if (jsonData) {
                return new ServerError(response.status, jsonData, jsonData.detail);
            }
            return new ServerError(response.status, {}, message);
        }
        if (!status) {
            return new NetworkError(message);
        }
        return null;
    }
}

export default new Http();
