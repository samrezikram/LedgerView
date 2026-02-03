import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { renderWithProviders } from '../testUtils';
import { Button } from '@components';

describe('Button', () => {
  it('renders label and handles press', () => {
    const onPress = jest.fn();
    const { getByText } = renderWithProviders(
      <Button label="Continue" onPress={onPress} />,
    );
    fireEvent.press(getByText('Continue'));
    expect(onPress).toHaveBeenCalled();
  });
});
