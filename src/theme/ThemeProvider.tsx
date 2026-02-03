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
          canvas: '#0B1220',
          surface: '#121A2B',
          surfaceAlt: '#1B2438',
          primary: '#4C8DFF',
          primarySoft: '#1E3158',
          ink: '#F5F7FF',
          inkMuted: '#A6B1C4',
          border: '#243045',
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
