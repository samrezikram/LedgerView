import { AppText, Card } from '@components';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useFormatters } from '@hooks';
import { Coin, CoinHistoryPoint } from '@lib/coinranking';
import { useTheme } from '@theme';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { VictoryAxis, VictoryChart, VictoryLine } from 'victory-native';

type CoinDetailSheetProps = {
  readonly sheetRef: React.RefObject<BottomSheetModal | null>;
  readonly coin: Coin | null;
  readonly history: CoinHistoryPoint[];
  readonly isLoading: boolean;
  readonly error: string;
  readonly high: string;
  readonly low: string;
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
  const snapPoints = useMemo(() => ['55%', '60%'], []);

  const chartData = useMemo(
    () =>
      history.map(point => ({
        x: new Date(point.timestamp * 1000),
        y: Number(point.price),
      })),
    [history],
  );

  const formatDate = (value: Date) => {
    const month = value.getMonth() + 1;
    const day = value.getDate();
    return `${month}/${day}`;
  };

  if (!coin) return null;

  const safePrice = formatPrice(coin.price);
  const highLabel = high === '--' ? '--' : `$${high}`;
  const lowLabel = low === '--' ? '--' : `$${low}`;

  return (
    <BottomSheetModal
      ref={sheetRef}
      snapPoints={snapPoints}
      index={1}
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
          {isLoading && <AppText tone="muted">Loading chart...</AppText>}
          {!isLoading && history.length === 0 && (
            <AppText tone="muted">No history available.</AppText>
          )}
          {!isLoading && history.length > 0 && (
            <VictoryChart
              height={180}
              scale={{ x: 'time' }}
              padding={{ top: 16, bottom: 24, left: 48, right: 16 }}
            >
              <VictoryAxis
                dependentAxis
                style={{
                  axis: { stroke: theme.colors.border },
                  grid: { stroke: theme.colors.border, opacity: 0.5 },
                  tickLabels: { fill: theme.colors.inkMuted, fontSize: 10 },
                }}
                tickCount={4}
              />
              <VictoryAxis
                style={{
                  axis: { stroke: theme.colors.border },
                  tickLabels: { fill: theme.colors.inkMuted, fontSize: 10 },
                }}
                tickCount={4}
                tickFormat={value => formatDate(value as Date)}
              />
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
    overflow: 'hidden',
  },
  error: {
    marginTop: 8,
  },
});
