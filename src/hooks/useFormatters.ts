import { useCallback } from 'react';

export function useFormatters() {
  const formatPrice = useCallback((value: string | number) => {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) return '--';
    return parsed.toFixed(2);
  }, []);

  const formatPercent = useCallback((value: string | number) => {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) return '--';
    return parsed.toFixed(2);
  }, []);

  return { formatPrice, formatPercent };
}
