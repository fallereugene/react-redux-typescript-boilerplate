import { ThunkAction } from '@/contracts';
import { defineApplicationState } from '.';

/**
 * Начальная инициализация приложения
 */
const init: ThunkAction<Promise<void>> = () => async (dispatch, getState, { api }) => {
    try {
        const result = await api.module.get();
        console.warn(`result:`, result);
    } catch (e) {
        console.warn(`error processing`);
    } finally {
        console.warn(`finally processing`);
    }

    dispatch(defineApplicationState(true));
};

export default init;
