import { Request, Server } from '@hapi/hapi';

/**
 * Overall interface for all incoming requests
 */
interface PingRequest extends Request {
    server: Server;
}

interface InfoRequest extends Request {
    server: Server;
}

export {
    PingRequest,
    InfoRequest,
};
