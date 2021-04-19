import { RequestResult } from '../contracts';
import BaseModule from './base-module';

interface IPost {
    body: string;
    id: string;
    title: string;
    userId: number;
}

export default class Module extends BaseModule {
    async get(): Promise<RequestResult<IPost[]>> {
        return super._get(`/posts`);
    }
}
