import { withConnect } from '@/hocs';
import { MapState, MapDispatch } from '@/contracts';

import ErrorBoundary from './error-boundary';

export const mapStateToProps: MapState<{}> = () => ({});

export const mapDispatchToProps: MapDispatch<{}> = () => ({});

export default withConnect<{}, {}>(mapStateToProps, mapDispatchToProps)(ErrorBoundary);
