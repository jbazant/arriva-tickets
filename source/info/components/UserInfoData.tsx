import React from 'react';
import { UserInfoResult } from '../../bileto/types';
import { ListItemText } from '../../common/components/ListItem/ListItemText';
import { formatNumber } from '../../common/utils/numberFormat';

export type UserInfoDataProps = {
  data: UserInfoResult;
  isLoaded: boolean;
};

export function UserInfoData({ data, isLoaded }: UserInfoDataProps) {
  const fullName = `${data?.firstname || ''} ${data?.lastname || ''}`.trim() || '-';
  const credits = (data?.credit != null ? formatNumber(Math.floor(data.credit)) : '-') + ' Kč';

  return (
    <>
      <ListItemText
        leftText="E-mail"
        rightText={data?.email}
        isLoaded={isLoaded}
        skeletonWidth="27%"
      />
      <ListItemText leftText="Jméno" rightText={fullName} isLoaded={isLoaded} skeletonWidth="30%" />
      <ListItemText
        leftText="Kredity"
        rightText={credits}
        isLoaded={isLoaded}
        skeletonWidth="25%"
      />
    </>
  );
}
