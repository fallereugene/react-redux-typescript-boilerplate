import { useTranslation } from 'react-i18next';

interface IProps {
    keyString: string;
}

const T: React.FunctionComponent<IProps> = ({ keyString }) => {
    const { t } = useTranslation();
    return <>{t(keyString)}</>;
};

export default T;
