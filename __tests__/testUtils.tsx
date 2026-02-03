import React from 'react';
import { render } from '@testing-library/react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type Options = Parameters<typeof render>[1];

export function renderWithProviders(
  ui: React.ReactElement,
  options?: Options,
) {
  return render(
    <SafeAreaProvider>
      <ThemeProvider>
        <BottomSheetModalProvider>{ui}</BottomSheetModalProvider>
      </ThemeProvider>
    </SafeAreaProvider>,
    options,
  );
}
