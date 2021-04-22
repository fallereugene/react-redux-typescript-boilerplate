import { devServerConfig } from './configs';
import { getParsedArguments } from './utils';

const parsedArgs = getParsedArguments();

export default {
  mode: `development`,
  target: parsedArgs.es5 ? ['web', 'es5'] : `web`,
  devtool: `cheap-module-source-map`,
  devServer: devServerConfig,
};
