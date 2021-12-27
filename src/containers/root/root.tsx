import { Route, BrowserRouter, Routes } from 'react-router-dom';
import PrivateRoute from '@components/private-route';
import { PrivateRoute as Private } from '@routes/private-route';
import { Loader } from '@components/loader';
import { Main } from '@routes/main';
import { NotFound } from '@routes/not-found';
import { Routes as ClientRoutes } from '@/constants';

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
    }, [init]);

    if (!isApplicationReady) {
        return <Loader />;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path={ClientRoutes.ROOT} element={<Main />} />
                <Route
                    path={ClientRoutes.PRIVATE}
                    element={<PrivateRoute isAuthenticated={!!1} component={Private} />}
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Root;
