import nock from 'nock';
import { DateTime } from 'luxon';
import { BiletoApi } from './BiletoApi';

describe('ApiReader', () => {
  const config = {
    baseUrl: 'https://api.test.com/v1',
    authData: {
      clientId: 'CLIENT_ID',
      clientSecret: 'CLIENT_SECRET',
    },
  };
  let biletoApi: BiletoApi;

  const nockToBileto = () => nock(config.baseUrl);

  beforeEach(() => {
    biletoApi = new BiletoApi(config);
  });

  describe('setToken', () => {
    it('token should be null by default', () => {
      expect(biletoApi.token).toBe(null);
    });

    it('should setToken', () => {
      biletoApi.setToken('TOKEN');

      expect(biletoApi.token).toBe('TOKEN');
    });
  });

  describe('authUser', () => {
    it('should get data from correct URL', async () => {
      const scope = nockToBileto()
        .post('/oauth/auth', {
          client_id: 'CLIENT_ID',
          client_secret: 'CLIENT_SECRET',
          grant_type: 'password',
          username: 'j.bazant@gmail.com',
          password: 'password',
        })
        .reply(200, {
          access_token: 'ACCESS_TOKEN',
          token_type: 'Bearer',
          expires_in: 3600,
          refresh_token: 'REFRESH_TOKEN',
        });

      const response = await biletoApi.authUser({
        username: 'j.bazant@gmail.com',
        password: 'password',
      });

      scope.done();
      expect(response.accessToken).toBe('ACCESS_TOKEN');
      expect(response.refreshToken).toBe('REFRESH_TOKEN');
      const expectedDateTime = DateTime.now().plus({ seconds: 3600 });
      const dateTimeDiff = response.expiresAt.diff(expectedDateTime, 'seconds').toObject();
      expect(dateTimeDiff.seconds).toBeCloseTo(0, 1);
    });
  });

  describe('loadTickets', () => {
    it('should get data from correct URL', async () => {
      biletoApi.setToken('ACCESS_TOKEN');
      const scope = nockToBileto()
        .get('/customers/USER_ID/orders')
        .query({
          with: 'Items.Transactions.Item.Seat,Items.Transactions.Leg.DepartureStation,Items.Transactions.Leg.ArrivalStation',
          sort: '-CreatedAt',
          limit: 5,
        })
        .matchHeader('Authorization', 'ACCESS_TOKEN')
        .replyWithFile(200, __dirname + '/__fixtures__/tickets.json');

      const response = await biletoApi.loadTickets('USER_ID');
      expect(response).toEqual([
        {
          connectionId: '2019-11-21T18:36:00+01:00',
          departure: '2019-11-21T17:30:00+01:00',
          from: 'Praha, Nádraží Holešovice',
          orderId: 'RGBMKBZ',
          ticketId: '3826ab08-f46a-4645-9430-58c5db16c9ed',
          to: 'Teplice, Benešovo náměstí',
          valid: false,
        },
        {
          connectionId: '2019-11-21T06:40:00+01:00',
          departure: '2019-11-21T05:40:00+01:00',
          from: 'Teplice, Benešovo náměstí',
          orderId: 'RGBMKBZ',
          ticketId: '50b671f7-3db0-4dc1-b40e-6f963bbf66f0',
          to: 'Praha, Nádraží Holešovice',
          valid: false,
        },
        {
          code: 'VB4',
          connectionId: '2019-11-18T06:40:00+01:00',
          departure: '2019-11-18T05:40:00+01:00',
          from: 'Teplice, Benešovo náměstí',
          seat: '21',
          ticketId: 'c14b322e-a219-4a2a-85fe-a304bf014a9a',
          orderId: 'RGBMKBZ',
          to: 'Praha, Nádraží Holešovice',
          valid: true,
        },
        {
          code: 'X6R',
          connectionId: '2019-11-05T22:38:00+01:00',
          departure: '2019-11-05T21:30:00+01:00',
          from: 'Praha, Nádraží Holešovice',
          seat: '25',
          ticketId: '31eaf216-e3e3-48c0-af39-5bf44995d8c8',
          orderId: 'RQA2XVX',
          to: 'Teplice, Hlavní nádraží',
          valid: true,
        },
      ]);
      scope.done();
    });
  });

  describe('loadUser', () => {
    it('should get data from correct URL', async () => {
      biletoApi.setToken('ACCESS_TOKEN');
      const scope = nockToBileto()
        .get('/users/current')
        .matchHeader('Authorization', 'ACCESS_TOKEN')
        .replyWithFile(200, __dirname + '/__fixtures__/user.json');

      const response = await biletoApi.loadUser();
      expect(response).toEqual({
        userId: '7b78b17e-b042-4b48-a331-2bd6c7036f94',
        email: 'j.bazant@gmail.com',
        firstname: 'Jiří',
        lastname: 'Bažant',
        credit: 5,
      });
      scope.done();
    });
  });
});
