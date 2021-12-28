import path from 'path';

const excludeNodeModulesExcept = (modules) => {
    let pathSep = path.sep;
    if (pathSep === '\\') pathSep = '\\\\';
    const moduleRegExps = modules.map((modName) => {
        return new RegExp(`node_modules${pathSep}${modName}`);
    });
    return (modulePath) => {
        if (/node_modules/.test(modulePath)) {
            // eslint-disable-next-line
            for (let i = 0; i < moduleRegExps.length; i++) if (moduleRegExps[i].test(modulePath)) return false;
            return true;
        }
        return false;
    };
};

export default excludeNodeModulesExcept;
