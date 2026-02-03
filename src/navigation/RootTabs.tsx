import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import FavoritesScreen from '../screens/FavoritesScreen';
import HomeScreen from '../screens/HomeScreen';

export type RootTabParamList = {
  Home: undefined;
  Favorites: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const tabIcons: Record<keyof RootTabParamList, string> = {
  Home: '🏠',
  Favorites: '⭐️',
};

export default function RootTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused }) => (
          <Text style={[styles.tabIcon, focused && styles.tabIconActive]}>
            {tabIcons[route.name]}
          </Text>
        ),
        tabBarStyle: styles.tabBar,
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
    borderTopWidth: 0,
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
