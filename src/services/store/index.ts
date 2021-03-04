import thunk from 'redux-thunk';
import { applyMiddleware, createStore, Store } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { IExtraArguments, IApplicationState } from '@/contracts';
import logger from '@services/logger';
import api from '../api';
import combinedReducers from './combined-reducer';

// дополнительные сервисы/аргументы для стора
export const extraArgs: IExtraArguments = {
    logger,
    api,
};

export class ApplicationStore<TAppState extends IApplicationState, TExtraArgs extends IExtraArguments> {
    private _store: Store<TAppState>;

    constructor(private _extraArgs: TExtraArgs) {
        this._store = this._createStore(this._extraArgs);
        this._enableHot();
    }

    get store(): Store<TAppState> {
        return this._store;
    }

    get state(): TAppState {
        return this._store.getState();
    }

    /**
     * Создание стора
     * @param extraArgs - эктра аргументы
     */
    private _createStore(extraArgs: TExtraArgs): any {
        return createStore(
            combinedReducers,
            composeWithDevTools(
                applyMiddleware(
                    thunk.withExtraArgument(extraArgs),
                    createLogger({
                        collapsed: true,
                        timestamp: false,
                    }),
                ),
            ),
        );
    }

    private _enableHot() {
        if ((module as any).hot) {
            (module as any).hot.accept('./combined-reducer', () => {
                this._store.replaceReducer(require('./combined-reducer').default);
            });
        }
    }
}

export default new ApplicationStore<IApplicationState, IExtraArguments>(extraArgs);
