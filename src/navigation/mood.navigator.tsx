import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MoodScreen } from '../screens/mood/mood.component';

const Stack = createStackNavigator();

export const MoodNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name='Home' component={MoodScreen}/>
  </Stack.Navigator>
);
