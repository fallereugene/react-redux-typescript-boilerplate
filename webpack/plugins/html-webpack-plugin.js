import { join } from 'path';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { rootDir } from '../utils';

const config = {
    minify: {
        removeComments: true,
        useShortDoctype: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        sortAttributes: true,
        sortClassName: true,
    },
    template: join(rootDir, `./src/index.html`),
    meta: {
        viewport: 'width=device-width, initial-scale=1',
    },
    version: `UI ver. ${JSON.parse(fs.readFileSync(`manifest.json`)).version}`,
};

export default new HtmlWebpackPlugin(config);
