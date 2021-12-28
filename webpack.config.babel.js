import merge from 'webpack-merge';
import { mode, getParsedArguments, isSuitableNodeEngine, updateManifest, updateReleaseNotes } from './webpack/utils';
import baseConfig from './webpack/base';
import devConfig from './webpack/dev';
import prodConfig from './webpack/prod';

isSuitableNodeEngine();

export default () => {
    const { type } = getParsedArguments();
    if (type) {
        updateManifest(type);
        updateReleaseNotes();
    }
    // eslint-disable-next-line
    console.warn(`Running system building...`);
    return mode === `production` ? merge(baseConfig, prodConfig) : merge(baseConfig, devConfig);
};
