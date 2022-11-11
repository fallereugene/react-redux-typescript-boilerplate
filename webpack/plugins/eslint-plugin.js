import { join } from 'path';
import ESLintPlugin from 'eslint-webpack-plugin';
import { rootDir } from '../utils';

const config = {
    context: join(rootDir, '/src'),
    extensions: ['js', 'jsx', 'ts', 'tsx'],
    emitWarning: true,
    emitError: false,
    cache: true,
    cacheLocation: join(rootDir, 'node_modules/.cache/.eslintcache'),
};

export default new ESLintPlugin(config);
