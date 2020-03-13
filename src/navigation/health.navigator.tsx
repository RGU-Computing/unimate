import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HealthScreen } from '../screens/health/health.component';

const Stack = createStackNavigator();

export const HealthNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name='Health' component={HealthScreen}/>
  </Stack.Navigator>
);
