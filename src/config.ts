import Conf from 'conf';
import defaultConfig from '../config/default';
import localConfig from '../config/local';
import testConfig from '../config/test';
import productionConfig from '../config/production';
import { merge } from 'lodash';

const NODE_ENV = process.env.NODE_ENV || 'local';
const config = new Conf();

const configData = defaultConfig;

switch (NODE_ENV) {
    case 'production':
        merge(configData, productionConfig);
        break;
    case 'test':
        merge(configData, testConfig);
        break;
    case 'local':
        merge(configData, localConfig);
        break;
}

config.set(configData);

export {
    config,
}
