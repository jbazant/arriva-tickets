// @ts-ignore
import { version } from '../package.json';

const MINUTE = 1e3 * 60;
const DAY = MINUTE * 60 * 24;
const MONTH = DAY * 30;

export const config = {
  appVersion: version,
  api: {
    baseUrl: 'https://api.bileto.com/v1',
    authData: {
      clientId: 'ef8678a3-2d6a-4974-b0ab-ba32189f5840:4b66b529-6950-413f-bbc5-5825f92274e2',
      // not so secret secret...
      clientSecret: '0b1a9603-2e17-4874-9ba5-8cda005dc8aa',
    },
  },
  authorEmail: 'j.bazant@gmail.com',
  refreshInterval: 3e4,
  locale: 'cs-CZ',
  queryClient: {
    defaultOptions: {
      queries: {
        cacheTime: MONTH,
        staleTime: 15 * MINUTE,
      },
    },
  },
};
