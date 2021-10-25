import { Reducer } from 'redux';
import { IRootState } from './contracts';
import { ReducerActionTypes } from '@/contracts';
import { defineApplicationState, defineLocale } from './actions';

const INITIAL_STATE: IRootState = {
    isApplicationReady: false,
    isAuthenticated: false,
    currentLocale: `ru`,
};

const actionCreators = {
    defineApplicationState,
    defineLocale,
};
type ReducerActions = ReducerActionTypes<typeof actionCreators>;

export const reducer: Reducer<IRootState, ReducerActions> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case `Root: Define Application State`:
            return {
                ...state,
                isApplicationReady: action.payload,
            };
        case `Root: Define Locale`:
            return {
                ...state,
                currentLocale: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
