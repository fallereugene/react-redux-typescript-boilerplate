import { ActionCreator } from '@/contracts';
import { IDefineApplicationState } from '../contracts';
import { ActionTypes } from '../constants';

/**
 * Установка состояния приложения
 * @param isApplicationReady признак готовности приложения
 */
const defineApplicationState: ActionCreator<IDefineApplicationState, [boolean]> = (isApplicationReady) => ({
    type: ActionTypes.ROOT_DEFINE_APPLICATION_STATE,
    payload: isApplicationReady,
});

export default defineApplicationState;
