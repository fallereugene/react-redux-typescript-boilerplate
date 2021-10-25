import { Middleware as ReduxMiddleware } from 'redux';
import { MapStateToProps } from 'react-redux';
import { RouteProps } from 'react-router-dom';
import { IApplicationState } from '@/contracts';
import logger from '@services/logger';
import api from '@services/api';
import storage from '@services/storage';

export type NullableObject = {} | null | undefined;

type PropertyType<T> = T extends { [key: string]: infer U } ? U : never;

export type ReducerActionTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertyType<T>>;

export type Action<TPayload> = {
    type: string;
    payload?: TPayload;
};

export type Dispatch = <T>(
    action: T,
) => T extends (...args: any[]) => any ? ReturnType<T> : T extends Action<any> ? T : never;

type ThunkType<TReturn, TAppState, TExtraArgs> = (
    dispatch: Dispatch,
    getState: () => TAppState,
    extraArgs: TExtraArgs,
) => TReturn;

// Дефолтный экшн креатор, который возвращает объект Action
export type ActionCreator<TReturnedAction extends Action<any>, TArgs extends any[] = []> = (
    ...args: TArgs
) => TReturnedAction;

// Асинхронный экшн креатор, который возвращает ThunkAction
export type ThunkAction<
    TReturn = void,
    TArgs extends any[] = [],
    TAppState extends IApplicationState = IApplicationState,
    TExtraArgs extends IExtraArguments = IExtraArguments
> = (...args: TArgs) => ThunkType<TReturn, TAppState, TExtraArgs>;

// дженерик тип для mapStateToProps
export type MapState<
    TStateProps extends NullableObject = {},
    TOwnProps extends NullableObject = {},
    TAppState extends NullableObject = IApplicationState
> = MapStateToProps<TStateProps, TOwnProps, TAppState>;

// дженерик тип для mapDispatchToProps
export type MapDispatch<TDispatchProps extends NullableObject = {}, TOwnProps extends NullableObject = {}> = (
    dispatch: Dispatch,
    ownProps: TOwnProps,
) => TDispatchProps;

export type Selector<TReturn, TAppState extends IApplicationState = IApplicationState> = (state: TAppState) => TReturn;

export interface IRegisterReducer {
    [key: string]: Function;
}

export type WithRouterProps<T extends NullableObject = {}> = T & RouteProps;

// экстра аргументы, передаваемые в thunk
export interface IExtraArguments {
    logger: typeof logger;
    api: typeof api;
    storage: typeof storage;
}

export type Middleware = ReduxMiddleware<{}, IApplicationState, Dispatch>;
