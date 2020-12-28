type CustomResponse<T> = {
    statusCode: number;
    data: T;
    headers: Headers;
};

export default CustomResponse;
