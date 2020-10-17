import Joi from 'joi';
import { parquetResponse } from './validator';

const HTTPError = Joi.object().keys({
    statusCode: Joi.number().required().description('Code of current error'),
    error: Joi.string().required().description('Type description of error'),
    message: Joi.string().required().description('Message with description of error'),
}).label('HTTP_ERROR');

const BasicErrors = {
    400: {
        description: 'Bad request error occurred.',
        label: 'HTTP_BAD_REQUEST_ERROR',
        schema: HTTPError.example({
            statusCode: 400,
            error: 'Bad Request',
            message: 'Invalid request payload input',
        }).label('HTTP_BAD_REQUEST_ERROR'),
    },
    415: {
        description: 'Unsupported Media Type error occurred.',
        label: 'HTTP_UNSUPPORTED_MEDIA_ERROR',
        schema: HTTPError.example({
            statusCode: 415,
            error: 'Unsupported Media Type',
            message: 'Unsupported Media Type',
        }).label('HTTP_UNSUPPORTED_MEDIA_ERROR'),
    },
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

const parquet = {
    responses: Object.assign({}, BasicErrors, {
        200: {
            description: 'Receiving PONG response from service to detect alive instances',
            schema: parquetResponse,
        },
    }),
    payloadType: 'form',
};

const Documentation = {
    parquet,
};

export {
    Documentation,
};
