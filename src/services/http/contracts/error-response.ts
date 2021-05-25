import { AxiosError } from 'axios';

type ErrorResponse = {
    statusCode: number;
    headers: { [key: string]: string };
    error: AxiosError;
    data: null;
};

export default ErrorResponse;
