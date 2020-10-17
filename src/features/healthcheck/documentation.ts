import Joi from 'joi';
import { infoResponse, pingResponse } from './validator';

const HTTPError = Joi.object().keys({
    statusCode: Joi.number().required().description('Code of current error'),
    error: Joi.string().required().description('Type description of error'),
    message: Joi.string().required().description('Message with description of error'),
}).label('HTTP_ERROR');

const BasicErrors = {
    500: {
        description: 'An internal server error occurred.',
        label: 'HTTP_INTERNAL_SERVER_ERROR',
        schema: HTTPError.example({
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'An internal server error occurred',
        }).label('HTTP_INTERNAL_SERVER_ERROR'),
    },
};

const ping = {
    responses: Object.assign({}, BasicErrors, {
        200: {
            description: 'Receiving PONG response from service to detect alive instances',
            schema: pingResponse,
        },
    }),
};

const info = {
    responses: Object.assign({}, BasicErrors, {
        200: {
            description: 'Receiving Information response from service to detect current application version',
            schema: infoResponse,
        },
    }),
};

const Documentation = {
    ping,
    info,
};

export {
    Documentation,
};
