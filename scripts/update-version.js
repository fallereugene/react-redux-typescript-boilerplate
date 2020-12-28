const yargs = require('yargs/yargs');
const fs = require('fs');
const semver = require('semver');

const AvaliableTypes = {
  PATCH: `patch`,
  MINOR: `minor`,
  MAJOR: `major`,
};
const MANIFEST_PATH = `./manifest.json`;

(function () {
  const { hideBin } = require('yargs/helpers');
  const argv = yargs(hideBin(process.argv)).argv;
  let { env = [] } = argv;
  env = Array.isArray(env) ? env : env.split(` `);
  const passedArguments = env.reduce((accumulator, currentValue) => {
    const [key, value = true] = currentValue.split('=');
    return { ...accumulator, [key]: value };
  }, {});
  const parsed = JSON.parse(fs.readFileSync(MANIFEST_PATH));
  const newManifestData = Object.assign({}, parsed, {
    version: semver.inc(parsed.version, passedArguments.type),
    created: new Date().toLocaleString(),
  });
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(newManifestData, null, 2));
})();
