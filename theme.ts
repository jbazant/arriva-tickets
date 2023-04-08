import Entypo from '@expo/vector-icons/Entypo';
import { extendTheme } from 'native-base';

export const COLORS = {
  main: '#00becd',
  dark: '#333',
  //secondary: '#c7f5f3',
  white: '#fff',
  muted: '#666',
  tabBarInactive: '#aaa',
  textDefault: '#55595e',
  textLight: '#F4F4E9',
  textEmphatized: '#2c2c55',
  textImportant: '#00becd',
  textMuted: '#888',
  textWarn: '#ff9c00',
  textAlert: '#ff0000',
};

export const theme = extendTheme({
  colors: COLORS,
  components: {
    Button: {
      defaultProps: {
        m: 3,
      },
    },
    Divider: {
      defaultProps: {
        orientation: 'horizontal',
        m: 5,
        thickness: 1,
        bgColor: COLORS.muted,
        w: 250,
      },
    },
    Heading: {
      defaultProps: {
        color: COLORS.textEmphatized,
      },
    },
    Icon: {
      defaultProps: {
        as: Entypo,
        color: COLORS.textDefault,
        size: 4,
      },
    },
    Input: {
      defaultProps: {
        m: 3,
        mt: 1,
      },
    },
    Skeleton: {
      defaultProps: {
        startColor: 'coolGray.300',
        endColor: 'coolGray.100',
        borderRadius: 3,
      },
    },
    Text: {
      defaultProps: {
        color: COLORS.textDefault,
      },
    },
  },
});
