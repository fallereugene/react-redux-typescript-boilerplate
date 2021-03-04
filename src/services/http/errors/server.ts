export default class ServerError extends Error {
    status: number;
    data: any;

    constructor(status: number, data: any, message: string) {
        super(message);
        this.status = status;
        Object.assign(this, data || {});
        this.name = `ServerError`;
    }
}
