import React from 'react';
import { renderWithProviders } from '../testUtils';
import { Card, AppText } from '@components';

describe('Card', () => {
  it('renders children', () => {
    const { getByText } = renderWithProviders(
      <Card>
        <AppText>Inside</AppText>
      </Card>,
    );
    expect(getByText('Inside')).toBeTruthy();
  });
});
