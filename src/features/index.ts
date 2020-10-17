import { default as healthcheck } from './healthcheck';
import { default as parquet } from './parquet';
import { Server } from '@hapi/hapi';

async function features(server: Server): Promise<Server> {
    await healthcheck(server);
    await parquet(server);

    return server;
}

export {
    features,
};
