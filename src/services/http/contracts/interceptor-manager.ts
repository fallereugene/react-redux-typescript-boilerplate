import { InterceptorProcessing } from '.';

type InterceptorManager<V> = {
    use(onFulfilled?: (value: V) => V | Promise<V>, onRejected?: (error: any) => any): number;
    eject(id: number): void;
    getProcessings(): InterceptorProcessing<V>[];
};

export default InterceptorManager;
