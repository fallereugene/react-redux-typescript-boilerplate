export default {
  splitChunks: {
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: `vendor`,
        chunks: `initial`,
      },
    },
  },
};
