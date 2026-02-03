import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { renderWithProviders } from '../testUtils';
import { PillButton } from '@components';

describe('PillButton', () => {
  it('renders label and handles press', () => {
    const onPress = jest.fn();
    const { getByText } = renderWithProviders(
      <PillButton label="Price" onPress={onPress} />,
    );
    fireEvent.press(getByText('Price'));
    expect(onPress).toHaveBeenCalled();
  });
});
