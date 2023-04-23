import { config } from '../../config';

const currentLocale = config.locale;

const DEFAULT_NUMBER_FORMATTER = new Intl.NumberFormat(currentLocale, {
  maximumFractionDigits: 0,
});

export const formatNumber = (number: number, config?: Intl.NumberFormatOptions): string => {
  const formatter = config
    ? new Intl.NumberFormat(currentLocale, config)
    : DEFAULT_NUMBER_FORMATTER;
  return formatter.format(number);
};
