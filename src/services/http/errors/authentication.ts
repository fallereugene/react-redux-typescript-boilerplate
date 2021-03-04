import { IChallenge } from '../contracts';

export default class AuthenticationError extends Error {
    status: number;
    headers: Headers;
    challenge: IChallenge | null;
    payload: any;

    constructor(status: number, data: any, challenge: IChallenge | null, headers: Headers) {
        let message = `Authentication Error, status: ${status.toString()}`;
        if (challenge) {
            message = `${message}, Scheme: ${challenge.scheme}`;
        }
        if (data) {
            message = `${message}, payload: ${JSON.stringify(data)}`;
        }
        super(message);
        this.headers = headers;
        this.status = status;
        this.challenge = challenge;
        this.payload = data;
        this.name = 'AuthenticationError';
    }
}
