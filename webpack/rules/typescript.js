// eslint-disable-next-line
const tsConfigFile = require('../../tsconfig.json');

export default {
    test: /\.tsx?$/,
    loader: `ts-loader`,
    options: {
        // disable type checker - we will use it in fork plugin
        transpileOnly: true,
        logLevel: `info`,
        compilerOptions: tsConfigFile,
        happyPackMode: true,
    },
    exclude: /node_modules/,
};
