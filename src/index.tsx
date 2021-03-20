import './styles/main.scss';
import { Provider } from 'react-redux';
import { INITIAL_LOCALE } from '@/constants';
import { createServer } from '@services/mocks';
import { registerInterceptors } from '@services/api';
import { initI18n } from './i18n';
import applicationStore from '@services/store';
import ErrorBoundary from '@containers/error-boundary';
import Root from '@containers/root';

initI18n(INITIAL_LOCALE);
registerInterceptors();

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

process.env.ENV !== `production` ? createServer(() => renderApplication(Root)) : renderApplication(Root);

if ((module as any).hot) {
    (module as any).hot.accept(`@containers/root`, () => {
        renderApplication(require('@containers/root').default);
    });
}
