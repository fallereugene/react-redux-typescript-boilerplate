import fs from 'fs';
import os from 'os';
import moment from 'moment';
import path from 'path';
import { rootDir } from '.';

const buildReleaseNotesFile = (releaseNotesFilePath, appVersion) => {
  const fileContent = fs.readFileSync(releaseNotesFilePath, 'utf8');
  const fileLines = fileContent.split(os.EOL);
  const START_RELEASE_NOTES_LINE_NUMBER = 8;
  const delimiterLine = '~~~~~~~~~~~~~~~~~~~~~~~~~';
  const currentDate = moment().format('DD.MM.YYYY');

  fileLines.splice(
    START_RELEASE_NOTES_LINE_NUMBER,
    0,
    ...[delimiterLine, `v.${appVersion} (${currentDate})`, delimiterLine],
  );

  const newFileContent = fileLines.join(os.EOL);
  fs.writeFileSync(releaseNotesFilePath, newFileContent, 'utf8');
};

const updateReleaseNotes = () => {
  const manifestPath = path.join(rootDir, 'manifest.json');
  const releaseNotesPath = path.join(rootDir, 'ReleaseNotes.txt');
  const releaseNotesDevPath = path.join(rootDir, 'ReleaseNotesDev.txt');
  const parsedManifest = JSON.parse(fs.readFileSync(manifestPath));
  console.warn(`Updating release notes...`);
  buildReleaseNotesFile(releaseNotesPath, parsedManifest.version);
  buildReleaseNotesFile(releaseNotesDevPath, parsedManifest.version);
}

export default updateReleaseNotes;
