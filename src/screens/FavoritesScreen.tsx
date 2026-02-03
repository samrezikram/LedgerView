import {
  AppText,
  Card,
  CoinDetailSheet,
  IconButton,
  Screen,
  TopBar,
} from '@components';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
  useCoinDetailSheet,
  useFavoritesState,
  useFormatters,
  useLogout,
} from '@hooks';
import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

function ItemSeparator() {
  return <View style={styles.separator} />;
}

export default function FavoritesScreen() {
  const { handleLogout, isAuthBusy } = useLogout();
  const { favorites, isLoading, toggleFavorite } = useFavoritesState();
  const { formatPrice } = useFormatters();
  const sheetRef = React.useRef<BottomSheetModal>(null);
  const {
    selectedCoin,
    history,
    isLoading: isHistoryLoading,
    error,
    highLow,
    openCoin,
  } = useCoinDetailSheet({ sheetRef });

  let content = (
    <FlatList
      data={favorites}
      keyExtractor={item => item.uuid}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => openCoin(item)}>
          <Card style={styles.row}>
            <View style={styles.rowHeader}>
              <AppText variant="bodyLg" style={styles.coinName}>
                {item.name}
              </AppText>
              <IconButton
                icon="Remove"
                size="pill"
                onPress={event => {
                  event.stopPropagation();
                  toggleFavorite(item);
                }}
              />
            </View>
            <View style={styles.rowFooter}>
              <AppText tone="muted">{item.symbol}</AppText>
              <AppText variant="bodyLg">${formatPrice(item.price)}</AppText>
            </View>
          </Card>
        </Pressable>
      )}
    />
  );

  if (isLoading) {
    content = (
      <View style={styles.loading}>
        <AppText tone="muted">Loading favorites...</AppText>
      </View>
    );
  } else if (favorites.length === 0) {
    content = (
      <Card style={styles.emptyCard}>
        <AppText tone="muted">
          No favorites yet. Add coins from the Home tab.
        </AppText>
      </Card>
    );
  }

  return (
    <Screen padded={false} style={styles.flex}>
      <TopBar
        title="Favorites"
        subtitle="Your saved coins in one place."
        rightAction={
          <IconButton
            icon="Logout"
            onPress={handleLogout}
            size="pill"
            disabled={isAuthBusy}
          />
        }
      />
      {content}
      <CoinDetailSheet
        sheetRef={sheetRef}
        coin={selectedCoin}
        history={history}
        isLoading={isHistoryLoading}
        error={error}
        high={formatPrice(String(highLow.high))}
        low={formatPrice(String(highLow.low))}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  emptyCard: {
    marginHorizontal: 20,
    marginTop: 16,
  },
  loading: {
    padding: 24,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    paddingTop: 12,
  },
  separator: {
    height: 12,
  },
  row: {
    padding: 16,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coinName: {
    flex: 1,
    marginRight: 12,
  },
  rowFooter: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
