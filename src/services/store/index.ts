import { createStore, applyMiddleware, combineReducers, Store, ReducersMapObject } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { IExtraArguments, IApplicationState, IRegisterReducer } from '@/contracts';
import logger from '@services/logger';
import api from '../api';

// дополнительные сервисы/аргументы для стора
export const extraArgs: IExtraArguments = {
    logger,
    api,
};

export class ApplicationStore<TAppState extends IApplicationState, TExtraArgs extends IExtraArguments> {
    private _store: Store<TAppState>;
    private _collection: ReducersMapObject<TAppState> = {} as ReducersMapObject<TAppState>;

    constructor(private _extraArgs: TExtraArgs) {
        this._store = this._createStore(this._extraArgs);
    }

    get store(): Store<TAppState> {
        return this._store;
    }

    get state(): TAppState {
        return this._store.getState();
    }

    /**
     * Регистрация редьюсера в сторе
     * @param reducers - объект редьюсеров
     */
    registerReducer(reducer: IRegisterReducer): void {
        this._store.replaceReducer(
            combineReducers<TAppState>({
                ...this._collection,
                ...reducer,
            }),
        );
    }

    /**
     * Создание стора
     * @param extraArgs - эктра аргументы
     */
    private _createStore(extraArgs: TExtraArgs): Store<TAppState> {
        return createStore(
            () => ({} as TAppState),
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
}

export default new ApplicationStore<IApplicationState, IExtraArguments>(extraArgs);
