import { join } from 'path';
import { rootDir } from './utils';
import { optimization, alias } from './configs';
import * as plugins from './plugins';
import * as rules from './rules';

export default {
  context: __dirname,
  target: `web`,
  entry: ['core-js', join(rootDir, `src/index.tsx`)],
  output: {
    path: join(rootDir, `build/dist`),
    filename: `[name].[contenthash].js`,
    chunkFilename: `[name].[chunkhash].js`,
  },
  module: {
    rules: [rules.javascriptRule, rules.typescriptRule, rules.stylesRule, rules.imagesRule, rules.fontsRule],
  },
  plugins: [
    plugins.htmlWebpackPlugin,
    plugins.forkTsCheckerWebpackPlugin,
    plugins.eslintPlugin,
    plugins.definePlugin,
    plugins.providePlugin,
    plugins.stylelintPlugin,
  ],
  resolve: {
    alias,
    extensions: [`.tsx`, `.ts`, `.js`, `.jsx`],
  },
  optimization,
};
