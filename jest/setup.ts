import '@testing-library/jest-native/extend-expect';
import { Settings } from 'luxon';
import { config } from '../source/config';

Settings.defaultLocale = config.locale;
