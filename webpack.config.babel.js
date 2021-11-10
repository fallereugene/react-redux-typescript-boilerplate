import merge from 'webpack-merge';
import { 
    mode, 
    getParsedArguments, 
    isSuitableNodeEngine, 
    updateManifest, 
    updateReleaseNotes 
 } from './webpack/utils';
import baseConfig from './webpack/base';
import devConfig from './webpack/dev';
import prodConfig from './webpack/prod';

isSuitableNodeEngine();

export default () => {
    const type = getParsedArguments().type;
    if (type) {
        updateManifest(type);
        updateReleaseNotes();
    }
    console.warn(`Running system building...`);
    return mode === `production` ? merge(baseConfig, prodConfig) : merge(baseConfig, devConfig);
}
