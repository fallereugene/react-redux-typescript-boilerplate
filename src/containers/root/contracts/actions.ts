import { ResponseStatus } from '@/constants';
import { RequestResult } from '@/services/api/contracts';
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

export interface IRootInvokeAPI {
    type: ActionTypes.ROOT_INVOKE_API;
    payload: {
        pendingApiMethod: Promise<RequestResult<any>>;
        resolve(data: RequestResult<any>): void;
        ignoreResponseErrorStatusCodes?: Array<ResponseStatus>;
    };
}

export type Actions = IDefineApplicationState | IDefineLocale | IRootInvokeAPI;
