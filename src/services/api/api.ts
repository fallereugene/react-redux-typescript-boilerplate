import http from '../http';
import { Module } from './module';
import BaseAPI from './base-api';

class API extends BaseAPI {
    module = this.instantiateModule(Module);
}

export default new API(http);
