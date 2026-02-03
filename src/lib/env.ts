import Config from 'react-native-config';

export const env = {
  supabaseUrl: Config.SUPABASE_URL ?? '',
  supabaseAnonKey: Config.SUPABASE_ANON_KEY ?? '',
  coinrankingApiKey: Config.COINRANKING_API_KEY ?? '',
};

export const envStatus = {
  missing: [
    !env.supabaseUrl && 'SUPABASE_URL',
    !env.supabaseAnonKey && 'SUPABASE_ANON_KEY',
    !env.coinrankingApiKey && 'COINRANKING_API_KEY',
  ].filter(Boolean) as string[],
};

export const isEnvReady = envStatus.missing.length === 0;
