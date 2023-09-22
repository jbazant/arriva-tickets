import { DateTime } from 'luxon';
import { TicketData } from '../bileto/types';

export enum TicketAgeEnum {
  Newborn,
  Toddler,
  Kid,
  Teen,
  Adult,
  Senior,
  Death,
}

export type TicketDataExt = Omit<TicketData, 'departure' | 'arrival'> & {
  departure: DateTime;
  arrival: DateTime;
};
