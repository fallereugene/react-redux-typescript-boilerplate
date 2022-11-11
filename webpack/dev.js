import { devServerConfig } from './configs';
import { getParsedArguments, isServer } from './utils';
import * as plugins from './plugins';

const parsedArgs = getParsedArguments();

export default {
    mode: 'development',
    output: {
        pathinfo: true,
        filename: 'bundle.js',
        chunkFilename: '[name].chunk.js',
    },
    target: parsedArgs.es5 ? ['web', 'es5'] : 'web',
    devtool: 'cheap-module-source-map',
    devServer: devServerConfig,
    plugins: [isServer && plugins.reactRefreshPlugin].filter(Boolean),
};
