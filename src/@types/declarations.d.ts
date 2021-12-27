import classnames from 'classnames';
import * as _react from 'react';
import * as _reactDOM from 'react-dom';
import { compose } from 'redux';

/* eslint-disable */
declare global {
    const React: typeof _react;
    const cx: typeof classnames;
    const ReactDOM: typeof _reactDOM;
    const JSX: React.ElementType;
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

