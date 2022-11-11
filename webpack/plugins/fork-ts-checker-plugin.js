import { join } from 'path';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { rootDir, mode } from '../utils';

const config = {
    async: mode === `dev`,
    typescript: {
        configFile: join(rootDir, '/tsconfig.json'),
        diagnosticOptions: {
            syntactic: true,
        },
        mode: 'write-references',
    },
    eslint: {
        enabled: true,
        files: '../src/**/*.{ts,tsx,js,jsx}',
    },
    logger: {
        infrastructure: 'silent',
        issues: 'console',
    },
};

export default new ForkTsCheckerWebpackPlugin(config);
