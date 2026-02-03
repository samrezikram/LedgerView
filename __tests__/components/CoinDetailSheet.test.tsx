import React from 'react';
import { renderWithProviders } from '../testUtils';
import { CoinDetailSheet } from '@components';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

const mockCoin = {
  uuid: 'btc',
  rank: 1,
  name: 'Bitcoin',
  symbol: 'BTC',
  price: '40000',
  change: '2.1',
};

describe('CoinDetailSheet', () => {
  it('renders nothing when coin is null', () => {
    const sheetRef = React.createRef<BottomSheetModal>();
    const { toJSON } = renderWithProviders(
      <CoinDetailSheet
        sheetRef={sheetRef}
        coin={null}
        history={[]}
        isLoading={false}
        error=""
        high="--"
        low="--"
      />,
    );
    expect(toJSON()).toBeNull();
  });

  it('renders coin details when coin is provided', () => {
    const sheetRef = React.createRef<BottomSheetModal>();
    const { getByText } = renderWithProviders(
      <CoinDetailSheet
        sheetRef={sheetRef}
        coin={mockCoin}
        history={[]}
        isLoading={false}
        error=""
        high="45000"
        low="38000"
      />,
    );
    expect(getByText('Bitcoin')).toBeTruthy();
    expect(getByText('#1 • BTC')).toBeTruthy();
  });
});
