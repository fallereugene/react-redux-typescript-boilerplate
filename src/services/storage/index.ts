import loggerService from '../logger';

type AlaliableMode = 'localStorage' | 'sessionStorage';

// Сервис, предоставляющий интерфейс для работы с хранилищем браузера
export class Storage {
    private mode: AlaliableMode = 'localStorage';

    constructor(private logger: typeof loggerService) {}

    changeMode(mode: AlaliableMode): void {
        this.mode = mode;
        this.log(`Storage switched into ${mode} mode`);
    }

    set(key: string, value: string | number | boolean): void {
        window[this.mode].setItem(key, `${value}`);
        this.log(`${value} was written into ${this.mode}`);
    }

    get(key: string): string | number | boolean | null {
        this.log(`Getting value from ${this.mode}`);
        return window[this.mode].getItem(key);
    }

    setObject(key: string, value: object): void {
        window[this.mode].setItem(key, JSON.stringify(value));
        this.log(`Object was written into ${this.mode}`);
    }

    getObject<T>(key: string): T | null {
        this.log(`Getting object from ${this.mode}`);
        try {
            const value = window[this.mode].getItem(key);
            return value !== null ? JSON.parse(value) : null;
        } catch {
            return null;
        }
    }

    removeItem(key: string): void {
        window[this.mode].removeItem(key);
        this.log(`Object was deleted into ${this.mode}`);
    }

    clear(): void {
        window[this.mode].clear();
        this.log(`${this.mode} was cleared`);
    }

    private log(message: string): void {
        this.logger.log('', message);
    }
}

export default new Storage(loggerService);
