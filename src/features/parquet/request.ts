import { Request, Server } from '@hapi/hapi';

/**
 * Overall interface for all incoming requests
 */
interface ParquetRequest extends Request {
    server: Server;
    payload: {
        file: {
            path: string
        }
    }
}

export {
    ParquetRequest,
};
