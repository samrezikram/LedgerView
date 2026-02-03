import React from 'react';
import { renderWithProviders } from '../testUtils';
import { TopBar, IconButton } from '@components';

describe('TopBar', () => {
  it('renders title and subtitle', () => {
    const { getByText } = renderWithProviders(
      <TopBar title="Market" subtitle="Overview" />,
    );
    expect(getByText('Market')).toBeTruthy();
    expect(getByText('Overview')).toBeTruthy();
  });

  it('renders right action', () => {
    const { getByText } = renderWithProviders(
      <TopBar title="Market" rightAction={<IconButton icon="Out" />} />,
    );
    expect(getByText('Out')).toBeTruthy();
  });
});
