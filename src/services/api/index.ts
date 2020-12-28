import coreApi from '@/core/api';
import module from './module';

export const registerInterceptors = () => {
    coreApi.interceptors.response.use(
        (r: any) => r,
        (error: any) => {
            /**
             * Произвольная логика приложения, которая предполагает реакцию
             * на запросы/коды/ошибки
             */
            console.warn(`Error occured: ${error.name}`);
        },
    );
};

export default {
    module: module(coreApi),
};
