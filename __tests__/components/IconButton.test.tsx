import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { renderWithProviders } from '../testUtils';
import { IconButton } from '@components';

describe('IconButton', () => {
  it('renders label and handles press', () => {
    const onPress = jest.fn();
    const { getByText } = renderWithProviders(
      <IconButton icon="Save" onPress={onPress} size="pill" />,
    );
    fireEvent.press(getByText('Save'));
    expect(onPress).toHaveBeenCalled();
  });
});
