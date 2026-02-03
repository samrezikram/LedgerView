require('@testing-library/jest-native/extend-expect');

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

jest.mock('react-native-gesture-handler', () =>
  require('react-native-gesture-handler/jestSetup'),
);

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    SafeAreaProvider: ({ children }) => <View>{children}</View>,
    SafeAreaView: ({ children }) => <View>{children}</View>,
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  };
});

jest.mock('@gorhom/bottom-sheet', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    BottomSheetModal: React.forwardRef((props, ref) => <View {...props} />),
    BottomSheetModalProvider: ({ children }) => <View>{children}</View>,
    BottomSheetBackdrop: View,
    BottomSheetView: View,
  };
});

jest.mock('victory-native', () => {
  const React = require('react');
  const { View } = require('react-native');
  const Mock = props => <View {...props} />;
  return {
    VictoryChart: Mock,
    VictoryLine: Mock,
    VictoryAxis: Mock,
  };
});
