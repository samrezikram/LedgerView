import { colors } from './colors';
import { radii } from './radii';
import { shadows } from './shadows';
import { spacing } from './spacing';
import { fontFamilies, typeScale } from './typography';

export const lightTheme = {
  colors,
  radii,
  shadows,
  spacing,
  typography: {
    families: fontFamilies,
    scale: typeScale,
  },
};

export type Theme = typeof lightTheme;
