import thunk from 'redux-thunk';
import { applyMiddleware, createStore, Store, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { httpMiddleware } from '@/middlewares';
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

    private _isDevelopmentMode = process.env.ENV !== `production`;

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
        const composeEnhancers =
            (this._isDevelopmentMode && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
        return createStore(
            combinedReducers,
            composeEnhancers(applyMiddleware(thunk.withExtraArgument(extraArgs), ...this._getMiddlewares(extraArgs))),
        );
    }

    private _getMiddlewares(extraArgs: TExtraArgs) {
        const base = [thunk.withExtraArgument(extraArgs), httpMiddleware];
        if (this._isDevelopmentMode) {
            return [
                ...base,
                createLogger({
                    collapsed: true,
                    timestamp: false,
                }),
            ];
        }
        return [...base];
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
