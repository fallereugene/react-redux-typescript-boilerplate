import { Router, Switch, Route } from 'react-router-dom';
import { Routes } from '@/constants';
import browserHistory from '@/services/browser-history';
import PrivateRoute from '../private-route';
import Loader from '@components/loader';
import Main from '@routes/main';
import NotFound from '@routes/not-found';

export interface IRootStateProps {
    isApplicationReady: boolean;
}

export interface IRootDispatchProps {
    init(): void;
}

export type Props = IRootStateProps & IRootDispatchProps;

const Root: React.FunctionComponent<Props> = (props) => {
    const { isApplicationReady, init } = props;
    React.useEffect(() => {
        init();
    }, []);
    if (!isApplicationReady) {
        return <Loader />;
    }
    return (
        <Router history={browserHistory}>
            <Switch>
                <Route exact path={Routes.ROOT} component={Main} />
                <PrivateRoute exact path={Routes.PRIVATE} render={() => <></>} />
                <Route exact path="*" component={NotFound} />
            </Switch>
        </Router>
    );
};

export default Root;
