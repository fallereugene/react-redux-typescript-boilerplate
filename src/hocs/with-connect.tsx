import { connect, InferableComponentEnhancerWithProps } from 'react-redux';
import { NullableObject, IApplicationState, MapState, MapDispatch } from '@/contracts';

// TODO Реализовать возможность в неявном виде указание locale как инжекунтый пропс
// чтобы при указании его в mapState интерфейсе не было ошибки в mapState функции

const withConnect = <
    TStateProps extends NullableObject = {},
    TDispatchProps extends NullableObject = {},
    TOwnProps extends NullableObject = {},
    TAppState extends IApplicationState = IApplicationState
>(
    mapStateToProps: MapState<TStateProps, TOwnProps, TAppState>,
    mapDispatchToProps: MapDispatch<TDispatchProps, TOwnProps>,
): InferableComponentEnhancerWithProps<TStateProps & TDispatchProps, TOwnProps & { children?: React.ReactNode }> => {
    return connect(
        (state: TAppState, ownProps: TOwnProps): TStateProps => ({
            // инжектированное свойство локали, чтобы при ее изменении компонент перерендеривался
            locale: state.root.currentLocale,
            ...mapStateToProps(state, ownProps),
        }),
        mapDispatchToProps as any,
    ) as any;
};

export default withConnect;
