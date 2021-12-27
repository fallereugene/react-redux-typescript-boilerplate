import './styles/main.scss';
import { Provider } from 'react-redux';
import { createServer } from '@services/mocks';
import applicationStore from '@services/store';
import ErrorBoundary from '@components/error-boundary';
import { Root } from '@containers/root';

const renderApplication = (Component: React.ElementType) => {
    ReactDOM.render(
        <Provider store={applicationStore.store}>
            <ErrorBoundary>
                <Component />
            </ErrorBoundary>
        </Provider>,
        document.getElementById(`root`),
    );
};

if (process.env.ENV !== 'production') {
    createServer(() => renderApplication(Root));
} else {
    renderApplication(Root);
}

if (module.hot && module.hot.accept) {
    module.hot.accept();
}
