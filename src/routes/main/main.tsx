import { WithRouterProps } from '@/contracts';
import T from '@components/translation';

export interface IMainStateProps {
    locale: string;
}

export interface IMainDispatchProps {
    changeLocale(locale: string): void;
}

type Props = WithRouterProps<IMainStateProps & IMainDispatchProps>;

const Main: React.FunctionComponent<Props> = ({ changeLocale, locale }) => {
    return (
        <div className="main">
            <div className="main__container">
                <div className="main__container main__container__logo">
                    <button onClick={() => changeLocale(locale === `ru` ? `en` : `ru`)}>Change language</button>
                    <T keyString="welcome" />
                </div>
            </div>
        </div>
    );
};

export default Main;
