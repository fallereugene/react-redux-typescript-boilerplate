import { ProvidePlugin } from 'webpack';

const config = {
    cx: `classnames`,
    React: `react`,
    ReactDOM: `react-dom`,
};

export default new ProvidePlugin(config);
