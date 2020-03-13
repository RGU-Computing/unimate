import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { EmotivityScreen } from '../screens/emotivity/emotivity.component';

const Stack = createStackNavigator();

export const EmotivityNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name='Emotivity' component={EmotivityScreen}/>
  </Stack.Navigator>
);
