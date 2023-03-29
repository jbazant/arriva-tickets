import nock from 'nock';
import { config } from '../source/config';

export const nockToBileto = (options?: nock.Options) => nock(config.api.baseUrl, options);
