import { Server, Model } from 'miragejs';
import { list } from './fixtures';
import { modelRoutes } from './routes';

export const createServer = ({ environment = 'development' } = {}) => {
    const server = new Server({
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

    return server;
};
