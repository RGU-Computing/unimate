import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TraxivityScreen } from '../screens/traxivity/traxivity.component';

const Stack = createStackNavigator();

export const TraxivityNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name='Traxivity' component={TraxivityScreen}/>
  </Stack.Navigator>
);
