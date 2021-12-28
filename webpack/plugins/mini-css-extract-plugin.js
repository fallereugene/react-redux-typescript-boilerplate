import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config = {
    filename: '[name].[contenthash].css',
    chunkFilename: '[id].[contenthash].css',
};

export default new MiniCssExtractPlugin(config);
