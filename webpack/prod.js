import TerserJSPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import * as plugins from './plugins';

export default {
  mode: `production`,
  target: ['web', 'es5'],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserJSPlugin({
        extractComments: false,
        minify: (file, sourceMap) => {
          const uglifyJsOptions = {
            /* your `uglify-js` package options */
          };

          if (sourceMap) {
            uglifyJsOptions.sourceMap = {
              content: sourceMap,
            };
          }

          return require('uglify-js').minify(file, uglifyJsOptions);
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [plugins.cleanWebpackPlugin, plugins.copyWebpackPlugin, plugins.miniCssExtractPlugin],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
