import { IChallenge, InterceptorProcessing, InterceptorManager } from './contracts';

export default class Interceptor {
    protected _interceptors = {
        request: this._getManager<RequestInit>(),
        response: this._getManager<Response>(),
    };

    get interceptors() {
        return this._interceptors;
    }

    protected getChallenge(response: Response) {
        const wwwAuth = response.headers.get('WWW-Authenticate');
        if (!wwwAuth) {
            return null;
        }

        const index = wwwAuth.indexOf(' ');
        const challenge: IChallenge = { scheme: '' };
        if (index === -1) {
            challenge.scheme = wwwAuth;
        } else {
            challenge.scheme = wwwAuth.substring(0, index).trim();
            challenge.data = {};
            const split: any[] = wwwAuth.substr(index + 1).split(',');
            split.forEach((token: string) => {
                const indexOfEq = token.indexOf('=');
                const key = token.substring(0, indexOfEq).trim();
                let value = token.substring(indexOfEq + 1).trim();
                if (value && value.length) {
                    value = JSON.parse(decodeURIComponent(value));
                }
                challenge.data[key] = value;
            });
        }

        return challenge;
    }

    protected withOnFulfilled<T>(r: T, interceptors: InterceptorManager<T>) {
        for (const p of interceptors.getProcessings()) {
            r = p.onFulfilled(r);
        }
        return r;
    }

    protected withOnRejected(r: any, interceptors: InterceptorManager<any>) {
        for (const p of interceptors.getProcessings()) {
            const result = p.onRejected(r);
            if (result) {
                r = result;
            }
        }
        return r;
    }

    private _getManager<T>(): InterceptorManager<T> {
        const processors: { [key: string]: InterceptorProcessing<T> } = {};
        return {
            use(onFulfilled?: (response: T) => T, onRejected?: (error: any) => any) {
                const key = new Date().getTime();
                processors[key] = {
                    onFulfilled: onFulfilled ?? ((r: T) => r),
                    onRejected: onRejected ?? ((r: any) => r),
                };
                return key;
            },
            eject(key: number) {
                delete processors[key];
            },
            getProcessings() {
                return Object.values(processors);
            },
        };
    }
}
