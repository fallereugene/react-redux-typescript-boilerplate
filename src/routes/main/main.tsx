import { WithRouterProps, Locales } from '@/contracts';
import T from '@/services/translation';

export interface IMainStateProps {
    locale: string;
}

export interface IMainDispatchProps {
    changeLocale(locale: Locales): void;
}

type Props = WithRouterProps<IMainStateProps & IMainDispatchProps>;

const Main: React.FunctionComponent<Props> = ({ changeLocale, locale }) => {
    return (
        <div className="main">
            <div className="main__container">
                <div className="main__container main__container__logo">
                    <button type="button" onClick={() => changeLocale(locale === `ru` ? `en` : `ru`)}>
                        Change language
                    </button>
                    {T(`welcome`)}
                </div>
            </div>
        </div>
    );
};

export default Main;
