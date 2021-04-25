import logger from '../logger';
type AlaliableMode = 'localStorage' | 'sessionStorage';

// Сервис, предоставляющий интерфейс для работы с хранилищем браузера
export class Storage {
    private _mode: AlaliableMode = 'localStorage';
    constructor(private _logger: typeof logger) {}
    changeMode(mode: AlaliableMode): void {
        this._mode = mode;
        this._log(`Storage switched into ${mode} mode`);
    }
    set(key: string, value: string | number | boolean): void {
        window[this._mode].setItem(key, `${value}`);
        this._log(`${value} was written into ${this._mode}`);
    }
    get(key: string): string | number | boolean | null {
        this._log(`Getting value from ${this._mode}`);
        return window[this._mode].getItem(key);
    }
    setObject(key: string, value: object): void {
        window[this._mode].setItem(key, JSON.stringify(value));
        this._log(`Object was written into ${this._mode}`);
    }
    getObject<T>(key: string): T | null {
        this._log(`Getting object from ${this._mode}`);
        try {
            const value = window[this._mode].getItem(key);
            return value !== null ? JSON.parse(value) : null;
        } catch {
            return null;
        }
    }
    removeItem(key: string): void {
        window[this._mode].removeItem(key);
        this._log(`Object was deleted into ${this._mode}`);
    }
    clear(): void {
        window[this._mode].clear();
        this._log(`${this._mode} was cleared`);
    }
    private _log(message: string): void {
        this._logger.log(``, message);
    }
}

export default new Storage(logger);
