import { init as initServer } from "../../../src/server";
import { git, name, version } from '../../../package.json';
import { Server } from "@hapi/hapi";

describe('healthcheck feature', () => {
    let server: Server;
    beforeAll(async () => {
        server = await initServer();
    });

    afterEach(async () => {
        jest.clearAllMocks();
    });

    afterAll(async () => {
        jest.restoreAllMocks();
        await server.stop();
    });

    it('should correctly response on ping', async () => {
        const response = await server.inject({
            method: 'GET',
            url: '/v1/healthcheck/ping',
        });
        expect(response.statusCode).toEqual(200);
        expect(response.payload).toEqual(JSON.stringify({ping: "PONG"}));
    });

    it('should correctly response on info', async () => {
        const response = await server.inject({
            method: 'GET',
            url: '/v1/healthcheck/info',
        });
        expect(response.statusCode).toEqual(200);
        expect(response.payload).toEqual(JSON.stringify({
            appName: name,
            appVersion: version,
            clusterName: "local",
            git
        }));
    });
});
