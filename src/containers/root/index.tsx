import store from '@services/store';
import root from './reducer';

store.registerReducer({ root });

export { default } from './root.connect';
export { IRootState } from './contracts';
