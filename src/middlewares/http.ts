import { IRootInvokeAPI } from '@/containers/root/contracts';
import { ActionTypes } from '@/containers/root/constants';
import { Action, Middleware } from '@/contracts';

/**
 * Мидлвер для перехвата и обработки вызовов API
 * Обработка ошибок происходит на этом же уровне.
 */
const httpMiddleware: Middleware = (store) => (next) => async (action: IRootInvokeAPI | Action<null>) => {
    if (action.type === ActionTypes.ROOT_INVOKE_API && action.payload) {
        const { pendingApiMethod, resolve, ignoreResponseErrorStatusCodes } = action.payload;
        const result = await pendingApiMethod;
        if (
            result.error &&
            ignoreResponseErrorStatusCodes?.length !== 0 &&
            !ignoreResponseErrorStatusCodes?.includes(result.error.statusCode)
        ) {
            switch (result.error.statusCode) {
                // обработка ошибок. Здесь можно обрабатывать как специфичные ошибки
                // так и пушить в некоторое поле в сторе, чтобы затем выводить информацию об ошибке (например, поле X-Correlation-Id).
                default:
                    break;
            }
        }
        resolve(result);
    }
    next(action);
};

export default httpMiddleware;
