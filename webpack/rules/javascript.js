import { join } from 'path';
import { rootDir, excludeNodeModulesExcept } from '../utils';

export const babelLoader = {
    loader: 'babel-loader',
    options: {
        configFile: join(rootDir, '/.babelrc.js'),
    },
};

export default {
    test: /\.(ts|tsx|js|jsx)$/,
    use: [babelLoader],
    exclude: excludeNodeModulesExcept([]),
};
