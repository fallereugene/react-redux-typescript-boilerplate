import { Server, Model } from 'miragejs';
import { list } from './fixtures';
import { modelRoutes } from './routes';

export const createServer = (cb: () => any, { environment = 'development' } = {}): void => {
    Promise.resolve().then(() => {
        new Server({
            environment,

            models: {
                list: Model,
            },

            fixtures: {
                list,
            },

            seeds(server) {
                server.loadFixtures();
            },

            routes() {
                modelRoutes(this);
            },
        });
        cb();
    });
};
