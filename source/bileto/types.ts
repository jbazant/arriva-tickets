import { DateTime } from 'luxon';

export type AuthResult = {
  username: string;
  password: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: DateTime;
};

export type TicketData = {
  readonly from: string;
  readonly to: string;
  readonly departure: string;
  readonly connectionId: string;
  readonly code?: string;
  readonly seat?: string;
  readonly orderId: string;
  readonly ticketId: string;
  readonly valid: boolean;
};

export type UserInfoResult = {
  userId: string;
  email: string | null;
  firstname: string | null;
  lastname: string | null;
  credit: number | null;
};
