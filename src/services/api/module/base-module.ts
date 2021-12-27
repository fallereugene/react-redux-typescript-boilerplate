import { v4 as uuidv4 } from 'uuid';
import { IApiConfig, RequestResult } from '../contracts';
import httpService from '../../http';

export default abstract class BaseModule {
    constructor(private http: typeof httpService, private config: IApiConfig) {}

    protected async get<TReturn>(url: string): Promise<RequestResult<TReturn>> {
        const xCorrelationID = BaseModule.generateXCorrelationID();
        return BaseModule.invoke(
            this.http.get(`${this.config.baseUrl}${url}`, this.getConfig(xCorrelationID)),
            xCorrelationID,
        );
    }

    protected async post<TReturn, TData extends {} = {}>(url: string, data: TData): Promise<RequestResult<TReturn>> {
        const xCorrelationID = BaseModule.generateXCorrelationID();
        return BaseModule.invoke(
            this.http.post(`${this.config.baseUrl}${url}`, data, this.getConfig(xCorrelationID)),
            xCorrelationID,
        );
    }

    protected async put<TReturn, TData extends {} = {}>(url: string, data: TData): Promise<RequestResult<TReturn>> {
        const xCorrelationID = BaseModule.generateXCorrelationID();
        return BaseModule.invoke(
            this.http.put(`${this.config.baseUrl}${url}`, data, this.getConfig(xCorrelationID)),
            xCorrelationID,
        );
    }

    protected async patch<TReturn, TData extends {} = {}>(url: string, data: TData): Promise<RequestResult<TReturn>> {
        const xCorrelationID = BaseModule.generateXCorrelationID();
        return BaseModule.invoke(
            this.http.patch(`${this.config.baseUrl}${url}`, data, this.getConfig(xCorrelationID)),
            xCorrelationID,
        );
    }

    protected async delete<TReturn, TData extends {} = {}>(url: string, data?: TData): Promise<RequestResult<TReturn>> {
        const xCorrelationID = BaseModule.generateXCorrelationID();
        return BaseModule.invoke(
            this.http.delete(`${this.config.baseUrl}${url}`, data, this.getConfig(xCorrelationID)),
            xCorrelationID,
        );
    }

    private static async invoke<TReturn>(
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

    private getConfig(xCorrelationID: string): Partial<IApiConfig> {
        return {
            headers: {
                ...this.config.headers,
                'X-Correlation-ID': xCorrelationID,
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
        };
    }

    private static generateXCorrelationID(): string {
        return uuidv4();
    }
}
