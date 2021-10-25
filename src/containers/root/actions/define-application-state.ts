import { IRootState } from '../contracts';
/**
 * Установка состояния приложения
 * @param isApplicationReady признак готовности приложения
 */
const defineApplicationState = (isApplicationReady: IRootState['isApplicationReady']) =>
    ({
        type: `Root: Define Application State`,
        payload: isApplicationReady,
    } as const);

export default defineApplicationState;
