import { Route, Redirect } from 'react-router-dom';
import { WithRouterProps } from '@/contracts';
import { Routes } from '@/constants';

export interface IPrivateRouteStateProps {
    isAuthenticated: boolean;
    render(): React.ReactNode;
}

type Props = WithRouterProps<IPrivateRouteStateProps>;

const PrivateRoute: React.FunctionComponent<Props> = (props) => {
    const { render, path, exact, isAuthenticated } = props;
    return (
        <Route
            path={path}
            exact={exact}
            render={(routeProps) => {
                return isAuthenticated ? render(routeProps) : <Redirect to={Routes.ROOT} />;
            }}
        />
    );
};

export default PrivateRoute;
