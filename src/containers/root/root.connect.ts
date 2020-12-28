import { MapState, MapDispatch } from '@/contracts';
import { withConnect } from '@/hocs';
import { init } from './actions';
import Root, { IRootStateProps, IRootDispatchProps } from './root';

export const mapStateToProps: MapState<IRootStateProps> = (state): IRootStateProps => ({
    isApplicationReady: state.root.isApplicationReady,
});

export const mapDispatchToProps: MapDispatch<IRootDispatchProps> = (dispatch) => ({
    init: () => dispatch(init()),
});

export default withConnect<IRootStateProps, IRootDispatchProps>(mapStateToProps, mapDispatchToProps)(Root);
