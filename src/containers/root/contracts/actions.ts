import { IRootState } from '.';
import { ActionTypes } from '../constants';

export interface IDefineApplicationState {
    type: ActionTypes.ROOT_DEFINE_APPLICATION_STATE;
    payload: IRootState['isApplicationReady'];
}

export interface IDefineLocale {
    type: ActionTypes.ROOT_DEFINE_LOCALE;
    payload: IRootState['currentLocale'];
}

export type Actions = IDefineApplicationState | IDefineLocale;
