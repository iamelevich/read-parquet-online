import { PluginSpecificConfiguration, RouteOptions, ServerRoute } from '@hapi/hapi';
import Controller from './ParquetController';
import { Documentation } from './documentation';
import * as Validator from './validator';
import { Server } from '@hapi/hapi';

export default async function (server: Server): Promise<void> {
    server.route({
        method: 'POST',
        path: '/v1/parquet',
        handler: Controller.parquet,
        options: {
            notes: 'Parse parquet file',
            auth: false,
            tags: ['api', 'parquet'],
            description: 'Return parquet data in JSON',
            validate: Validator.parquetRequest,
            response: {
                schema: Validator.parquetResponse,
            },
            payload: {
                maxBytes: 26214400,
                parse: true,
                output: 'file',
                multipart: {
                    output: "file"
                },
            },
            plugins: {
                'hapi-swagger': Documentation.parquet,
            } as PluginSpecificConfiguration,
        } as RouteOptions,
    } as ServerRoute);
}
