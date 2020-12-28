import coreApi from '@/core/api';
import { BASE_URI } from '../constants';

export default (api: typeof coreApi) => ({
    get() {
        return api.getJson<string[]>(`${BASE_URI}/posts`);
    },
});
