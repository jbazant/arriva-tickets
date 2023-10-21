import { DateTime } from 'luxon';
import { ListItemProps, ListItemText } from './ListItemText';

export type ListItemDateTimeProps = Omit<ListItemProps, 'rightText'> & {
  dateTime: DateTime;
};

export const ListItemDateTime = ({ dateTime, ...rest }: ListItemDateTimeProps) => {
  if (dateTime.toISODate() === DateTime.now().toISODate()) {
    return (
      <ListItemText
        rightText={`Dnes v ${dateTime.toLocaleString(DateTime.TIME_24_SIMPLE)}`}
        {...rest}
      />
    );
  }

  return (
    <ListItemText
      rightText={dateTime.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}
      {...rest}
    />
  );
};
