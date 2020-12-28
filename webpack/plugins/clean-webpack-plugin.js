import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const config = {
  cleanOnceBeforeBuildPatterns: ['**/*'],
};

export default new CleanWebpackPlugin(config);
