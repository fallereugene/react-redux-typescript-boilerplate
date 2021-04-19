import { IApiConfig } from './contracts';
import BaseModule from './module/base-module';
import http from '../http';

export default abstract class BaseAPI {
    private _config: IApiConfig = {
        baseUrl: ``,
        headers: {},
    };
    constructor(private _http: typeof http) {}
    configure(config: Partial<IApiConfig>) {
        Object.assign(this._config, config);
    }

    protected instantiateModule<TModule extends new (_http: typeof http, _config: IApiConfig) => BaseModule>(
        Module: TModule,
    ): InstanceType<TModule> {
        return new Module(this._http, this._config) as InstanceType<TModule>;
    }
}
