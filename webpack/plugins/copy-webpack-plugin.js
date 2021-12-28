import { join } from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import { rootDir } from '../utils';

const releaseNotesPath = join(rootDir, `ReleaseNotes.txt`);
const manifestPath = join(rootDir, `manifest.json`);

// конфигурация путей, по которым нужно копировать содержимое as is
// в процессе сборки
const config = {
    patterns: [
        { from: manifestPath, to: './' },
        { from: releaseNotesPath, to: './' },
    ],
};

export default new CopyPlugin(config);
