import { Reducer } from 'redux';
import { Actions, IRootState } from './contracts';
import { ActionTypes } from './constants';

const INITIAL_STATE: IRootState = {
    isApplicationReady: false,
    isAuthenticated: false,
    currentLocale: `ru`,
};

export const reducer: Reducer<IRootState, Actions> = (state = INITIAL_STATE, action): IRootState => {
    switch (action.type) {
        case ActionTypes.ROOT_DEFINE_APPLICATION_STATE:
            return {
                ...state,
                isApplicationReady: action.payload,
            };
        case ActionTypes.ROOT_DEFINE_LOCALE:
            return {
                ...state,
                currentLocale: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
