import thunk from 'redux-thunk';
import { applyMiddleware, createStore, Store, compose } from 'redux';
import { createLogger } from 'redux-logger';
import storage from '@services/storage';
import logger from '@services/logger';
import { httpMiddleware } from '@/middlewares';
import { IExtraArguments, IApplicationState } from '@/contracts';
import { api } from '../api';
import combinedReducers from './combined-reducer';

// дополнительные сервисы/аргументы для стора
export const extraArgs: IExtraArguments = {
    logger,
    api,
    storage,
};

export class ApplicationStore<TAppState extends IApplicationState, TExtraArgs extends IExtraArguments> {
    private applicationStore: Store<TAppState>;

    private isDevelopmentMode = process.env.ENV !== 'production';

    constructor(private extraArgs: TExtraArgs) {
        this.extraArgs = extraArgs;
        this.applicationStore = this.createStore();
        this.enableHot();
    }

    get store(): Store<TAppState> {
        return this.applicationStore;
    }

    get state(): TAppState {
        return this.applicationStore.getState();
    }

    private createStore(): any {
        const composeEnhancers = (this.isDevelopmentMode && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
        return createStore(
            combinedReducers,
            composeEnhancers(applyMiddleware(thunk.withExtraArgument(extraArgs), ...this.getMiddlewares())),
        );
    }

    private getMiddlewares() {
        const base = [thunk.withExtraArgument(extraArgs), httpMiddleware];
        if (this.isDevelopmentMode) {
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

    private enableHot() {
        if (module.hot) {
            // eslint-disable-next-line
            module.hot.accept('./combined-reducer', () => {
                // eslint-disable-next-line
                this.applicationStore.replaceReducer(require('./combined-reducer').default);
            });
        }
    }
}

export default new ApplicationStore<IApplicationState, IExtraArguments>(extraArgs);
