import fs from 'fs';
import semver from 'semver';
import path from 'path';
import rootDir from './root-dir';

const updateManifest = (type) => {
    const manifestPath = path.join(rootDir, './manifest.json');
    const parsed = JSON.parse(fs.readFileSync(manifestPath));
    const newManifestData = {
        ...parsed,
        version: semver.inc(parsed.version, type),
        created: new Date().toLocaleString(),
    };
    // eslint-disable-next-line
    console.warn(`Updating manifest version...`);
    fs.writeFileSync(manifestPath, JSON.stringify(newManifestData, null, 2));
};

export default updateManifest;
