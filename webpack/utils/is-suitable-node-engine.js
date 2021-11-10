import semver from 'semver';
import { engines } from '../../package.json';

const isSuitableNodeEngine = () => {
    if (!semver.satisfies(process.version, engines.node)) {
        console.log(`Not suitable node version ${process.version}. Required version is ${engines.node}`);
        process.exit(1);
    }
    return true;
}

export default isSuitableNodeEngine;