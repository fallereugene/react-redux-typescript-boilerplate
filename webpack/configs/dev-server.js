const DEFAULT_PORT = 8080;
const SERVER_HOST = `127.0.0.1`;

export const devServerUrl = `http://${SERVER_HOST}:${DEFAULT_PORT}/`;

export const devServerConfig = {
    historyApiFallback: true,
    open: true,
    hot: 'only',
    client: {
        logging: 'info',
        overlay: false,
    },
    compress: true,
    port: DEFAULT_PORT,
    host: SERVER_HOST,
    headers: { 'Access-Control-Allow-Origin': '*' },
};
