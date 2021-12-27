import { Navigate } from 'react-router-dom';

interface IProps {
    component: React.ElementType;
    isAuthenticated: boolean;
}

const PrivateRoute: React.FunctionComponent<IProps> = (props) => {
    const { isAuthenticated, component: Component } = props;
    return isAuthenticated ? <Component /> : <Navigate to="/" />;
};

export default PrivateRoute;
