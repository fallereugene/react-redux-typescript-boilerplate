import { Dispatch } from '@/contracts';
import { ResponseStatus } from '@/constants';
import { ROOT_INVOKE_ACTION_TYPE } from '../constants';
import { RequestResult } from '@/services/api/contracts';

type ActionConfig = {
    /**
     * Список кодов ответоа api, при которых не нужно обрабатывать ошибку запроса
     * NOTE: если передать пустой массив, то будут игнорироваться все коды ошибок
     */
    ignoreResponseErrorStatusCodes?: ResponseStatus[];
};
// тип, возвращаемый зарезолвленным промисом
type UnboxPromise<T extends Promise<any>> = T extends Promise<infer U> ? U : never;

export interface IRootInvokeAPI {
    type: typeof ROOT_INVOKE_ACTION_TYPE;
    payload: {
        pendingApiMethod: Promise<RequestResult<any>>;
        resolve(data: RequestResult<any>): void;
        ignoreResponseErrorStatusCodes?: Array<ResponseStatus>;
    };
}

/**
 * Экшн для вызовов API
 * @param pendingApiMethod - вызванный метод API, результат которого нужно получить
 * @param config - конфиг
 */
const invoke = <TData, TApiMethod extends Promise<RequestResult<TData>>, TResult extends UnboxPromise<TApiMethod>>(
    pendingApiMethod: TApiMethod,
    config?: ActionConfig,
) => async (dispatch: Dispatch) =>
    new Promise<TResult>((resolve) => {
        dispatch<IRootInvokeAPI>({
            type: ROOT_INVOKE_ACTION_TYPE,
            payload: {
                pendingApiMethod,
                resolve: resolve as () => RequestResult<any>,
                ignoreResponseErrorStatusCodes: config?.ignoreResponseErrorStatusCodes,
            },
        });
    });

export default invoke;
