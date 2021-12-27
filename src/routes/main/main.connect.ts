import { defineLocale } from '@containers/root/actions';
import { withConnect } from '@/hocs';
import { MapState, MapDispatch } from '@/contracts';
import Main, { IMainStateProps, IMainDispatchProps } from './main';

export const mapStateToProps: MapState<IMainStateProps> = (state) => ({
    locale: state.root.currentLocale,
});

export const mapDispatchToProps: MapDispatch<IMainDispatchProps> = (dispatch) => ({
    changeLocale: (locale) => dispatch(defineLocale(locale)),
});

export default withConnect<IMainStateProps, IMainDispatchProps>(mapStateToProps, mapDispatchToProps)(Main);
