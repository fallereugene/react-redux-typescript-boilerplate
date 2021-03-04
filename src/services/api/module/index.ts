import coreApi from '@services/http';
import { BASE_URI } from '../constants';

export default (api: typeof coreApi) => ({
    get() {
        return api.getJson<string[]>(`${BASE_URI}/posts`);
    },
});
