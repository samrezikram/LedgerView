import { Platform } from 'react-native';

export const fontFamilies = {
  regular: Platform.select({
    ios: 'AvenirNext-Regular',
    android: 'Montserrat-Regular',
    default: 'System',
  }),
  medium: Platform.select({
    ios: 'AvenirNext-Medium',
    android: 'Montserrat-Medium',
    default: 'System',
  }),
  semibold: Platform.select({
    ios: 'AvenirNext-DemiBold',
    android: 'Montserrat-SemiBold',
    default: 'System',
  }),
  bold: Platform.select({
    ios: 'AvenirNext-Bold',
    android: 'Montserrat-Bold',
    default: 'System',
  }),
};

export const typeScale = {
  caption: 12,
  body: 14,
  bodyLg: 16,
  title: 20,
  headline: 24,
  display: 32,
};
