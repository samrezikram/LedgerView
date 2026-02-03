import React from 'react';
import { renderWithProviders } from '../testUtils';
import { Screen, AppText } from '@components';

describe('Screen', () => {
  it('renders children', () => {
    const { getByText } = renderWithProviders(
      <Screen>
        <AppText>Content</AppText>
      </Screen>,
    );
    expect(getByText('Content')).toBeTruthy();
  });
});
