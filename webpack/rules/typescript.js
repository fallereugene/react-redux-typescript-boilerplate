export default {
  test: /\.tsx?$/,
  loader: `ts-loader`,
  options: {
    // disable type checker - we will use it in fork plugin
    transpileOnly: true,
    logLevel: `info`,
    configFile: `./tsconfig.json`,
    happyPackMode: true,
  },
  exclude: /node_modules/,
};
