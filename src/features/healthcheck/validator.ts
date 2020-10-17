import Joi from 'joi';
import { git, name, version } from '../../../package.json';

// ping requests
const pingRequest = {};
const pingResponse = Joi.object({
    ping: Joi.string().allow('PONG').required(),
}).example({ ping: 'PONG' }).label('Healthcheck_Ping_Response');

// info requests
const infoRequest = {};
const infoResponse = Joi.object({
    appName: Joi.string().required().description('Application package name'),
    appVersion: Joi.string().required().description('Application package version'),
    clusterName: Joi.string().required().description('Environment cluster name'),
    git: Joi.object({
        hash: Joi.string().required().description('Git hash of source code application version'),
        ref: Joi.string().required().description('Reference on source code version source'),
        url: Joi.string().required().description('URL to source code'),
    }).description('GIT information about source code').label('Healthcheck_Info_Git_Schema'),
}).example({
    appName: name,
    appVersion: version,
    clusterName: process.env.PLUTO_ROOT_STACK || 'local',
    git,
}).label('Healthcheck_Info_Response');

export {
    pingRequest,
    pingResponse,
    infoRequest,
    infoResponse,
};
