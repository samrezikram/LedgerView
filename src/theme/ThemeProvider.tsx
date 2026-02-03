import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, Theme } from './theme';

const ThemeContext = createContext<Theme>(lightTheme);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const scheme = useColorScheme();
  const theme = useMemo(() => {
    if (scheme === 'dark') {
      return {
        ...lightTheme,
        colors: {
          ...lightTheme.colors,
          canvas: '#0B0F1A',
          surface: '#111827',
          surfaceAlt: '#151E2F',
          ink: '#F8FAFC',
          inkMuted: '#CBD5F5',
          border: '#1F2937',
        },
      };
    }
    return lightTheme;
  }, [scheme]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
