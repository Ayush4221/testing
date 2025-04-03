import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from '../pages/Landing';
// import Login from '../pages/Login';
// import Signup from '../pages/Signup';
// import Home from '../pages/Home';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen name="Landing" component={Landing} />
      {/* <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Home" component={Home} /> */}
    </Stack.Navigator>
  );
};

export default AppNavigator;