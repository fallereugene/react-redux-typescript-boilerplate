import { join } from 'path';
import { rootDir } from './utils';
import { alias } from './configs';
import * as plugins from './plugins';
import * as rules from './rules';

export default {
    context: __dirname,
    target: `web`,
    entry: ['core-js', join(rootDir, `src/index.tsx`)],
    output: {
        path: join(rootDir, `build/dist`),
    },
    cache: {
        type: 'filesystem',
        version: String(Date.now()),
        cacheDirectory: join(rootDir, 'node_modules/.cache'),
        store: 'pack',
        buildDependencies: {
            defaultWebpack: ['webpack/lib/'],
            config: [__filename],
        },
    },
    module: {
        rules: [rules.javascriptRule, rules.typescriptRule, rules.stylesRule, rules.imagesRule, rules.fontsRule],
    },
    plugins: [
        plugins.htmlWebpackPlugin,
        plugins.forkTsCheckerWebpackPlugin,
        plugins.eslintPlugin,
        plugins.definePlugin,
        plugins.stylelintPlugin,
        plugins.providePlugin,
    ],
    resolve: {
        alias,
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
};
