import './styles/main.scss';
import { Provider } from 'react-redux';
import { INITIAL_LOCALE } from '@/constants';
import applicationStore from '@services/store';
import { createServer } from '@services/mocks';
import { registerInterceptors } from '@services/api';
import { initI18n } from './i18n';
import ErrorBoundary from '@containers/error-boundary';
import Root from '@containers/root';

initI18n(INITIAL_LOCALE);
registerInterceptors();

process.env.ENV !== `production` && createServer();

ReactDOM.render(
    <Provider store={applicationStore.store}>
        <ErrorBoundary>
            <Root />
        </ErrorBoundary>
    </Provider>,
    document.getElementById(`root`),
);
