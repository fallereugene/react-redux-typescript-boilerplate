import { ThunkAction, Locales } from '@/contracts';
import { IDefineLocale } from '../contracts';
import { ActionTypes } from '../constants';

/**
 * Начальная инициализация приложения
 */
const defineLocale: ThunkAction<void, [Locales]> = (locale) => (dispatch) => {
    dispatch<IDefineLocale>({
        type: ActionTypes.ROOT_DEFINE_LOCALE,
        payload: locale,
    });
};

export default defineLocale;
