import { ThunkAction } from '@/contracts';
import defineApplicationState from './define-application-state';
import invoke from './invoke';

/**
 * Начальная инициализация приложения
 */
const init: ThunkAction<Promise<void>> = () => async (dispatch, getState, { api }) => {
    api.configure({
        baseUrl: `http://jsonplaceholder.typicode.com`,
    });

    try {
        const result = await dispatch(invoke(api.module.getList()));
        // eslint-disable-next-line
        console.warn(`result:`, result);
    } catch (e) {
        // eslint-disable-next-line
        console.warn(`error processing`);
    } finally {
        // eslint-disable-next-line
        console.warn(`finally processing`);
    }

    dispatch(defineApplicationState(true));
};

export default init;
