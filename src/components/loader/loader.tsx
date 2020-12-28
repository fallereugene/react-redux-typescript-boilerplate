import './styles.scss';

interface IProps {
    text?: string;
    className?: string;
}

const Loader: React.FunctionComponent<IProps> = ({ text, className }) => {
    return <div className={cx('loader', className)}>{text ?? `Loading. Please wait...`}</div>;
};

export default Loader;
