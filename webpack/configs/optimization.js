export default {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: `vendor`,
        chunks: `initial`,
      },
    },
  },
};
