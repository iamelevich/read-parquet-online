import Hapi from '@hapi/hapi';
import HapiPino from 'hapi-pino';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';
import Joi from 'joi';
import { config } from './config';
import { features } from "./features";
import { version } from "../package.json";
import { join } from 'path';

async function start () {
    const srcPath = __dirname.replace(/dist\/src/, 'src');

    // Create a server with a host and port
    let server = Hapi.server({
        host: config.get('host') as string,
        port: config.get('port') as number,
        routes: {
            files: {
                relativeTo: join(srcPath, '..', 'client', 'dist'),
            }
        }
    });
    server.validator(Joi);

    // Register all features
    server = await features(server);

    const swaggerOptions = {
        info: {
            title: 'Test API Documentation',
            version: version,
        },
    };

    // Register plugins
    await server.register({
        plugin: HapiPino,
        options: {
            prettyPrint: process.env.NODE_ENV !== 'production',
            // Redact Authorization headers, see https://getpino.io/#/docs/redaction
            redact: ['req.headers.authorization']
        }
    });
    await server.register(Inert);
    await server.register(Vision);
    await server.register({
        plugin: HapiSwagger,
        options: swaggerOptions
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, h) {
            return h.view('index');
        }
    });

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true
            }
        }
    });

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname.replace(/dist\/src/, 'src'),
        path: join('..', 'client', 'dist'),
    });

    await server.start()

    return server
}

start().catch((err) => {
    console.log(err);
    process.exit(1)
})
