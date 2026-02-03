import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { VictoryChart, VictoryLine } from 'victory-native';
import { AppText, Card } from '@components';
import { Coin, CoinHistoryPoint } from '@lib/coinranking';
import { useTheme } from '@theme';
import { useFormatters } from '@hooks';

type CoinDetailSheetProps = {
  sheetRef: React.RefObject<BottomSheetModal>;
  coin: Coin | null;
  history: CoinHistoryPoint[];
  isLoading: boolean;
  error: string;
  high: string;
  low: string;
};

export default function CoinDetailSheet({
  sheetRef,
  coin,
  history,
  isLoading,
  error,
  high,
  low,
}: CoinDetailSheetProps) {
  const theme = useTheme();
  const { formatPrice } = useFormatters();
  const snapPoints = useMemo(() => ['40%', '72%'], []);

  const chartData = useMemo(
    () =>
      history.map(point => ({
        x: new Date(point.timestamp * 1000),
        y: Number(point.price),
      })),
    [history]
  );

  const safePrice = formatPrice(coin.price);
  const highLabel = high === '--' ? '--' : `$${high}`;
  const lowLabel = low === '--' ? '--' : `$${low}`;

  if (!coin) return null;

  return (
    <BottomSheetModal
      ref={sheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
      backgroundStyle={{ backgroundColor: theme.colors.surface }}
      handleIndicatorStyle={{ backgroundColor: theme.colors.border }}
    >
      <BottomSheetView style={styles.content}>
        <View style={styles.header}>
          <View>
            <AppText variant="headline">{coin.name}</AppText>
            <AppText tone="muted">
              #{coin.rank} • {coin.symbol}
            </AppText>
          </View>
          <View>
            <AppText variant="title">${safePrice}</AppText>
            <AppText tone="muted">Current</AppText>
          </View>
        </View>
        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <AppText tone="muted">Price</AppText>
            <AppText variant="bodyLg">${safePrice}</AppText>
          </Card>
          <Card style={styles.statCard}>
            <AppText tone="muted">Change</AppText>
            <AppText variant="bodyLg">{coin.change}%</AppText>
          </Card>
        </View>
        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <AppText tone="muted">High</AppText>
            <AppText variant="bodyLg">{highLabel}</AppText>
          </Card>
          <Card style={styles.statCard}>
            <AppText tone="muted">Low</AppText>
            <AppText variant="bodyLg">{lowLabel}</AppText>
          </Card>
        </View>
        <Card style={styles.chartCard}>
          <AppText variant="bodyLg">Price history</AppText>
          {error ? (
            <AppText tone="primary" style={styles.error}>
              {error}
            </AppText>
          ) : null}
          {isLoading ? (
            <AppText tone="muted">Loading chart...</AppText>
          ) : (
            <VictoryChart padding={{ top: 16, bottom: 24, left: 40, right: 16 }}>
              <VictoryLine
                data={chartData}
                style={{ data: { stroke: theme.colors.primary } }}
              />
            </VictoryChart>
          )}
        </Card>
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    padding: 12,
  },
  chartCard: {
    marginTop: 8,
  },
  error: {
    marginTop: 8,
  },
});
