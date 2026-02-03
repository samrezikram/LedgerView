import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import FavoritesScreen from '../screens/FavoritesScreen';
import HomeScreen from '../screens/HomeScreen';
import { useTheme } from '../theme';
import { AppText } from '../components';

export type RootTabParamList = {
  Home: undefined;
  Favorites: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function RootTabs() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabLabel,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.inkMuted,
        tabBarIcon: ({ focused }) => (
          <AppText
            style={[
              styles.tabIcon,
              { color: focused ? theme.colors.primary : theme.colors.inkMuted },
              focused && styles.tabIconActive,
            ]}
          >
            {route.name === 'Home' ? 'H' : 'F'}
          </AppText>
        ),
        tabBarStyle: [
          styles.tabBar,
          { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.border },
        ],
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: Platform.select({ ios: 84, android: 72, default: 72 }),
    paddingTop: 8,
    paddingBottom: Platform.select({ ios: 24, android: 12, default: 12 }),
    borderTopWidth: 1,
    elevation: 6,
    shadowColor: '#0B0F1A',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  tabIcon: {
    fontSize: 18,
    opacity: 0.7,
  },
  tabIconActive: {
    opacity: 1,
  },
});
