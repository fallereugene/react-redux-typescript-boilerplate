const { argv } = require('yargs');

module.exports = (api) => {
    const env = argv.env ? (Array.isArray(argv.env) ? argv.env : argv.env.split(' ')) : [];
    const mode = !!env.find((value) => value === 'mode=dev') ? 'development' : 'production';
    // This caches the Babel config by environment.
    api.cache.using(() => mode);

    return {
        presets: [
            [
                '@babel/preset-env',
                {
                    targets: {
                        browsers: ['>1%', 'last 4 versions', 'not ie < 9'],
                    },
                    useBuiltIns: 'entry',
                    corejs: 3,
                },
            ],
            '@babel/preset-react',
        ],
        plugins: ['@babel/plugin-transform-runtime'],
    };
};
