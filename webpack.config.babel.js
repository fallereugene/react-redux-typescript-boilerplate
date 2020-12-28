import merge from 'webpack-merge';
import { mode } from './webpack/utils';
import baseConfig from './webpack/base';
import devConfig from './webpack/dev';
import prodConfig from './webpack/prod';

export default mode === `production` ? merge(baseConfig, prodConfig) : merge(baseConfig, devConfig);
