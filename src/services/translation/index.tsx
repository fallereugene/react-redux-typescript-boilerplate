import store from '@services/store';
import locales from './locales';

/**
 * Сервис интернационализации
 *
 * @param keyString - ключ локали
 */
const T = (keyString: keyof typeof locales.ru): string => locales[store.state.root.currentLocale][keyString];

export default T;
