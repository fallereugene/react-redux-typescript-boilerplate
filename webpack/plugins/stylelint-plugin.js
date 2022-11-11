import { join } from 'path';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import { rootDir } from '../utils';

const config = {
    // specify the config file location to be used by stylelint.
    configFile: `.stylelintrc`,
    // a string indicating the root of your SCSS files
    context: join(rootDir, '/src'),
    // specify the glob pattern for finding files
    files: [`**/*.scss`],
    cache: true,
    cacheLocation: join(rootDir, 'node_modules/.cache/.stylelintcache'),
};

export default new StyleLintPlugin(config);
