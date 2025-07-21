import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

import Home from '../pages/Home';
import Transactions from '../pages/Transactions';
import ScanQR from '../pages/ScanQR';
import Notifications from '../pages/Notifications';
import Settings from '../pages/Settings';
// import Settings from '../pages/SendMoney';
// import Settings from '../pages/Receipt';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#6366F1',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
          fontFamily: 'Poppins-Regular',
        },
        tabBarStyle: {
          height: 65,
          position: 'absolute',
          bottom: 15,
          left: 15,
          right: 15,
          borderRadius: 30,
          backgroundColor: 'white',
          paddingBottom: 8,
          paddingLeft: 8,
          paddingRight: 8,
          paddingTop: 8,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          borderTopWidth: 0,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Icon name="home" color={color} size={focused ? 28 : 24} />
          ),
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={Transactions}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color, focused }) => (
            <Icon name="history" color={color} size={focused ? 28 : 24} />
          ),
        }}
      />
      <Tab.Screen
        name="ScanQR"
        component={ScanQR}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View style={styles.scanButton}>
              <LinearGradient
                colors={['#6366F1', '#8B5CF6']}
                style={styles.gradientButton}
              >
                <Icon name="qrcode-scan" color="white" size={30} />
              </LinearGradient>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Alerts',
          tabBarIcon: ({ color, focused }) => (
            <Icon name="bell" color={color} size={focused ? 28 : 24} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <Icon name="cog" color={color} size={focused ? 28 : 24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  scanButton: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default BottomTabNavigator;