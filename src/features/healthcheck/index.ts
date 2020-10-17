import { PluginSpecificConfiguration, RouteOptions, ServerRoute } from '@hapi/hapi';
import Controller from './HealthCheckController';
import { Documentation } from './documentation';
import * as Validator from './validator';
import { Server } from '@hapi/hapi';

export default async function (server: Server): Promise<void> {
    server.route({
        method: 'GET',
        path: '/v1/healthcheck/ping',
        handler: Controller.ping,
        options: {
            notes: 'Provide information about service availability. That API endpoint using to identify that current node are alive and ready to accept requests',
            auth: false,
            tags: ['api', 'healthcheck'],
            description: 'Get detailed information about specified user',
            validate: Validator.pingRequest,
            response: {
                schema: Validator.pingResponse,
            },
            plugins: {
                'hapi-swagger': Documentation.ping,
            } as PluginSpecificConfiguration,
        } as RouteOptions,
    } as ServerRoute);

    server.route({
        method: 'GET',
        path: '/v1/healthcheck/info',
        handler: Controller.info,
        options: {
            notes: 'Provide information about application version and source code',
            auth: false,
            tags: ['api', 'healthcheck'],
            description: 'Get detailed information about deployed source code and package versions',
            validate: Validator.infoRequest,
            response: {
                schema: Validator.infoResponse,
            },
            plugins: {
                'hapi-swagger': Documentation.info,
            } as PluginSpecificConfiguration,
        } as RouteOptions,
    } as ServerRoute);
}
