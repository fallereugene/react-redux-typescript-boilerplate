import { join } from 'path';
import { rootDir } from '../utils';

export const babelLoader = {
  loader: 'babel-loader',
  options: {
    configFile: join(rootDir, '/.babelrc.js'),
  },
};

export default {
  test: /\.(ts|tsx|js|jsx)$/,
  use: [babelLoader],
  exclude: /node_modules/,
};
