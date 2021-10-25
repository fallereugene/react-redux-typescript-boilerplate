import { IRootState } from '../contracts';

/**
 * Начальная инициализация приложения
 * @param locale наименование локали
 * @returns экшн
 */
const defineLocale = (locale: IRootState['currentLocale']) =>
    ({
        type: `Root: Define Locale`,
        payload: locale,
    } as const);

export default defineLocale;
