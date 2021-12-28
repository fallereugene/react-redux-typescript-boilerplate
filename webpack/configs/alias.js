import { resolve } from 'path';
import { rootDir } from '../utils';

export default {
    '@': resolve(rootDir, './src'),
    '@components': resolve(rootDir, './src/components/'),
    '@containers': resolve(rootDir, './src/containers/'),
    '@routes': resolve(rootDir, './src/routes/'),
    '@hocs': resolve(rootDir, './src/hocs/'),
    '@core': resolve(rootDir, './src/core/'),
    '@services': resolve(rootDir, './src/services/'),
    '@assets': resolve(rootDir, './src/assets/'),
    '@utils': resolve(rootDir, './src/utils/index'),
};
