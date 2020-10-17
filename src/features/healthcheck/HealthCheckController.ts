import { ResponseObject, ResponseToolkit } from '@hapi/hapi';
import { InfoRequest, PingRequest } from './request';
import { git, name, version } from '../../../package.json';

export default class HealthCheckController {
    protected static infoResponse = {
        appName: name,
        appVersion: version,
        clusterName: process.env.PLUTO_ROOT_STACK || 'local',
        git,
    };

    /**
     * Get information about availability of service
     * @param {PingRequest} request
     * @param {ResponseToolkit} h
     * @returns {ResponseObject | Error}
     */
    public static async ping(request: PingRequest, h: ResponseToolkit): Promise<ResponseObject | Error> {
        request.logger.debug('Got request for healthcheck/ping', {}, ['/v1/healthcheck/ping']);
        return h.response({ ping: 'PONG' });
    }

    /**
     * Getting information about current application
     * @param {InfoRequest} request
     * @param {ResponseToolkit} h
     * @return {Promise<ResponseObject | Error>}
     */
    public static async info(request: InfoRequest, h: ResponseToolkit): Promise<ResponseObject | Error> {
        request.logger.debug('Got request for healthcheck/info', {}, ['/v1/healthcheck/info']);
        return h.response(HealthCheckController.infoResponse);
    }
}
