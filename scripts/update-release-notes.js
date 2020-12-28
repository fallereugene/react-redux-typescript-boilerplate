const fs = require('fs');
const os = require('os');
const moment = require('moment');

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

(function () {
  const MANIFEST_PATH = `./manifest.json`;
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH));
  const RELEASE_NOTES_PATH = `./ReleaseNotes.txt`;
  const RELEASE_NOTES_DEV_PATH = `./ReleaseNotesDev.txt`;
  buildReleaseNotesFile(RELEASE_NOTES_PATH, manifest.version);
  buildReleaseNotesFile(RELEASE_NOTES_DEV_PATH, manifest.version);
})();
