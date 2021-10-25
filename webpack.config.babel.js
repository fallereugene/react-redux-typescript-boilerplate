import merge from 'webpack-merge';
import { mode, isSuitableNodeEngine } from './webpack/utils';
import baseConfig from './webpack/base';
import devConfig from './webpack/dev';
import prodConfig from './webpack/prod';

isSuitableNodeEngine();

export default () => {
    return mode === `production` ? merge(baseConfig, prodConfig) : merge(baseConfig, devConfig);
}
