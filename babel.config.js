module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@components/*': './src/components/*',
          '@theme': './src/theme',
          '@theme/*': './src/theme/*',
          '@hooks': './src/hooks',
          '@hooks/*': './src/hooks/*',
          '@screens': './src/screens',
          '@screens/*': './src/screens/*',
          '@navigation': './src/navigation',
          '@navigation/*': './src/navigation/*',
          '@context': './src/context',
          '@context/*': './src/context/*',
          '@lib': './src/lib',
          '@lib/*': './src/lib/*',
          '@auth': './src/screens/auth',
          '@auth/*': './src/screens/auth/*',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
