import { combineReducers } from 'redux';
import root from '@containers/root/reducer';
import { IApplicationState } from '@/contracts';

const combinedReducers = combineReducers<IApplicationState>({
    root,
});

export default combinedReducers;
