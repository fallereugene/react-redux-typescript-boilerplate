import { Redirect } from 'react-router-dom';
import { Routes } from '@/constants';
import BaseRoute from '@/components/base-route';

export interface IPrivateRouteStateProps {
    isAuthenticated: boolean;
}

export interface IPrivateRouteDispatchProps {
    //
}

type Props = IPrivateRouteStateProps & IPrivateRouteDispatchProps;

/**
 * Приватный роут
 */
export default class PrivateRoute extends BaseRoute<Props> {
    render() {
        const { isAuthenticated, ...restRouteProps } = this.props;

        return isAuthenticated ? <BaseRoute {...restRouteProps} /> : <Redirect to={Routes.ROOT} />;
    }
}
