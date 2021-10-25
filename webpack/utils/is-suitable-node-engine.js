import semver from 'semver';
import { engines } from '../../package.json';

const isSuitableNodeEngine = () => {
    if (!semver.satisfies(process.version, engines.node)) {
        console.log(`Current node version ${process.version} less than minimum required: ${engines.node}`);
        process.exit(1);
    }
    return true;
}

export default isSuitableNodeEngine;