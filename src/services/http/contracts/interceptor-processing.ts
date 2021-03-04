type InterceptorProcessing<T> = {
    onFulfilled: (response: T) => T;
    onRejected: (error: any) => any;
};

export default InterceptorProcessing;
