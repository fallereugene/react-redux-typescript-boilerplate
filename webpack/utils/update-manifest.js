import fs from 'fs';
import semver from 'semver';
import path from 'path';
import { rootDir } from '.';

const updateManifest = (type) => {
  const manifestPath = path.join(rootDir, './manifest.json');
  const parsed = JSON.parse(fs.readFileSync(manifestPath));
  const newManifestData = Object.assign({}, parsed, {
    version: semver.inc(parsed.version, type),
    created: new Date().toLocaleString(),
  });
  console.warn(`Updating manifest version...`);
  fs.writeFileSync(manifestPath, JSON.stringify(newManifestData, null, 2));
}

export default updateManifest;


