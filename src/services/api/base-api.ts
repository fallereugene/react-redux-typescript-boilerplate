import { IApiConfig } from './contracts';
import BaseModule from './module/base-module';
import httpService from '../http';

export default abstract class BaseAPI {
    private config: IApiConfig = {
        baseUrl: '',
        headers: {},
    };

    constructor(private http: typeof httpService) {}

    configure(config: Partial<IApiConfig>) {
        Object.assign(this.config, config);
    }

    protected instantiateModule<TModule extends new (http: typeof httpService, config: IApiConfig) => BaseModule>(
        Module: TModule,
    ): InstanceType<TModule> {
        return new Module(this.http, this.config) as InstanceType<TModule>;
    }
}
