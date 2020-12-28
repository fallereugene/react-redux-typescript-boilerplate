import { MapState, MapDispatch } from '@/contracts';
import { withConnect } from '@/hocs';
import PrivateRoute, { IPrivateRouteStateProps } from './private-route';

interface IOwnProps {
    render(): React.ReactNode;
}

export const mapStateToProps: MapState<IPrivateRouteStateProps, IOwnProps> = (
    state,
    ownProps,
): IPrivateRouteStateProps => ({
    isAuthenticated: state.root.isAuthenticated,
    ...ownProps,
});

export const mapDispatchToProps: MapDispatch<{}> = () => ({});

export default withConnect<IPrivateRouteStateProps, {}, IOwnProps>(mapStateToProps, mapDispatchToProps)(PrivateRoute);
