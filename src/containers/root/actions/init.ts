import { ThunkAction } from '@/contracts';
import { defineApplicationState, invoke } from '.';

/**
 * Начальная инициализация приложения
 */
const init: ThunkAction<Promise<void>> = () => async (dispatch, getState, { api }) => {
    api.configure({
        baseUrl: `http://jsonplaceholder.typicode.com`,
    });

    try {
        const result = await dispatch(invoke(api.module.get()));
        console.warn(`result:`, result);
    } catch (e) {
        console.warn(`error processing`);
    } finally {
        console.warn(`finally processing`);
    }

    dispatch(defineApplicationState(true));
};

export default init;
