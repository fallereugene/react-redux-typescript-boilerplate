import { Reducer } from '@/contracts';
import { IRootState } from './contracts';
import * as actions from './actions';

const INITIAL_STATE: IRootState = {
    isApplicationReady: false,
    isAuthenticated: false,
    currentLocale: `ru`,
};

export const reducer: Reducer<IRootState, typeof actions> = (state = INITIAL_STATE, action) => {
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
