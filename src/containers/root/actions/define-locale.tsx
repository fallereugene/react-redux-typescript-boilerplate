import { ThunkAction } from '@/contracts';
import { IDefineLocale } from '../contracts';
import { ActionTypes } from '../constants';
import { initI18n } from '@/i18n';

/**
 * Начальная инициализация приложения
 */
const defineLocale: ThunkAction<void, [string]> = (locale) => (dispatch) => {
    initI18n(locale);
    dispatch<IDefineLocale>({
        type: ActionTypes.ROOT_DEFINE_LOCALE,
        payload: locale,
    });
};

export default defineLocale;
