import TerserJSPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import * as plugins from './plugins';

export default {
  mode: `production`,
  optimization: {
    minimize: true,
    minimizer: [new TerserJSPlugin({}), new CssMinimizerPlugin()],
  },
  plugins: [plugins.cleanWebpackPlugin, plugins.copyWebpackPlugin, plugins.miniCssExtractPlugin],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
