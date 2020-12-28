/* eslint-disable */
export class Logger {
    constructor(private _isDebugMode = true, private _logConsoleInProductionMode = false) {
        this.log = this.log.bind(this);
    }
    log(groupName: string, target: any): void {
        if (!this._isDebugMode && !this._logConsoleInProductionMode) {
            return;
        }
        if (typeof target === `object`) {
            console.groupCollapsed(groupName);
            console.log(JSON.stringify(target, null, 4));
            console.groupEnd();
            return;
        }
        console.log(target);
    }
}

export default new Logger();
