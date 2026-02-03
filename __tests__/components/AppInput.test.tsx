import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { renderWithProviders } from '../testUtils';
import { AppInput } from '@components';

describe('AppInput', () => {
  it('renders label and helper text', () => {
    const { getByText } = renderWithProviders(
      <AppInput label="Email" helperText="Required" />,
    );
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('Required')).toBeTruthy();
  });

  it('handles text input', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = renderWithProviders(
      <AppInput placeholder="Type here" onChangeText={onChangeText} />,
    );
    fireEvent.changeText(getByPlaceholderText('Type here'), 'test');
    expect(onChangeText).toHaveBeenCalledWith('test');
  });
});
