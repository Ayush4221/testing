import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../pages/Home';
import Transactions from '../pages/Transactions';
import ScanQR from '../pages/ScanQR';
import Notifications from '../pages/Notifications';
import Settings from '../pages/Settings';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={Transactions}
        options={{
          tabBarLabel: 'Transactions',
          tabBarIcon: ({ color, size }) => (
            <Icon name="history" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="ScanQR"
        component={ScanQR}
        options={{
          tabBarLabel: 'Scan',
          tabBarIcon: ({ color, size }) => (
            <Icon name="qrcode-scan" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ color, size }) => (
            <Icon name="bell" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Icon name="cog" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;