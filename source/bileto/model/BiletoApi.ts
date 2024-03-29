import { DateTime } from 'luxon';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { AuthResult, TicketData, UserInfoResult } from '../types';

type BiletoApiConfigShape = {
  baseUrl: string;
  authData: {
    clientId: string;
    clientSecret: string;
  };
};

export class BiletoApi {
  private _config: BiletoApiConfigShape;
  private _axios: AxiosInstance;

  token?: string = null;

  constructor(config: BiletoApiConfigShape) {
    this._config = config;
    this._axios = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
    });
    this._axios.interceptors.request.use(this.authTokenInterceptor);
  }

  setToken(token: string | null) {
    this.token = token;
  }

  authTokenInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (this.token) {
      config.headers['Authorization'] = this.token;
    }

    return config;
  };

  authUser = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<AuthResult> => {
    const { clientId: client_id, clientSecret: client_secret } = this._config.authData;
    const { data } = await this._axios.post<{
      access_token: string;
      refresh_token: string;
      expires_in: number;
    }>('/oauth/auth', {
      grant_type: 'password',
      client_id,
      client_secret,
      username,
      password,
    });

    return {
      username,
      password,
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: DateTime.now().plus({ second: data.expires_in }),
    };
  };

  loadTickets = async (userId: string): Promise<TicketData[]> => {
    const { data } = await this._axios.get(`/customers/${userId}/orders`, {
      params: {
        with: 'Items.Transactions.Item.Seat,Items.Transactions.Leg.DepartureStation,Items.Transactions.Leg.ArrivalStation',
        sort: '-CreatedAt',
        limit: 5,
      },
    });

    return data.reduce((acc: Array<TicketData>, order: Record<string, any>) => {
      if (order.Items) {
        const orderCode = order.Code;
        order.Items.forEach((item: Record<string, any>) => {
          if (item.Completed && item.Transactions[0]) {
            item.Transactions.forEach(({ Item, Leg }: Record<string, any>) => {
              const ticketId = Item?.Id || item.ItemId || item.Id;

              acc.push({
                from: Leg.DepartureStation.Name,
                to: Leg.ArrivalStation.Name,
                departure: Leg.DepartureAt,
                arrival: Leg.ArrivalAt,
                code: Item?.Code,
                seat: Item?.Seat?.Label,
                orderId: orderCode,
                ticketId: ticketId,
                valid: !item.CancelledAt,
              });
            });
          }
        });
      }
      return acc;
    }, []);
  };

  loadUser = async (): Promise<UserInfoResult> => {
    const { data } = await this._axios.get<{
      Id: string;
      Email: string;
      Firstname: string | undefined;
      Lastname: string | undefined;
      CreditBalance: number;
    }>('/users/current', {});

    return {
      userId: data.Id,
      email: data.Email,
      firstname: data.Firstname,
      lastname: data.Lastname,
      credit: data.CreditBalance,
    };
  };
}
