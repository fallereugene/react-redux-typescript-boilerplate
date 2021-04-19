import { withConnect } from '@/hocs';
import { MapState, MapDispatch } from '@/contracts';
import Main, { IMainStateProps, IMainDispatchProps } from './main';
import { defineLocale } from '@containers/root/actions';

export const mapStateToProps: MapState<IMainStateProps> = (state) => ({
    locale: state.root.currentLocale,
});

export const mapDispatchToProps: MapDispatch<IMainDispatchProps> = (dispatch) => ({
    changeLocale: (locale) => dispatch(defineLocale(locale)),
});

export default withConnect<IMainStateProps>(mapStateToProps, mapDispatchToProps)(Main);
