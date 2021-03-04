export default class NetworkError extends Error {
    response: string;

    constructor(response: string) {
        super(`Network error, ${response}`);
        this.response = response;
        this.name = `NetworkError`;
    }
}
