import { DefinePlugin } from 'webpack';
import { mode, isServer } from '../utils';

const config = {
    'process.env': {
        ENV: JSON.stringify(mode),
        IS_DEV_SERVER: JSON.stringify(isServer),
    },
};

export default new DefinePlugin(config);
