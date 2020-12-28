import { Link } from 'react-router-dom';
import { WithRouterProps } from '@/contracts';

const NotFound: React.FunctionComponent<WithRouterProps<{}>> = () => {
    return (
        <>
            <h1 style={{ textAlign: `center` }}>
                404.
                <br />
                <small>Page not found</small>
            </h1>
            <Link className="link" to="/">
                Go to main
            </Link>
        </>
    );
};

export default NotFound;
