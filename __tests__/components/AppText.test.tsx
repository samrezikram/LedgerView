import React from 'react';
import { renderWithProviders } from '../testUtils';
import { AppText } from '@components';

describe('AppText', () => {
  it('renders text content', () => {
    const { getByText } = renderWithProviders(<AppText>Ledger</AppText>);
    expect(getByText('Ledger')).toBeTruthy();
  });
});
