import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MoodScreen } from '../screens/mood/mood.component';
import { AboutScreen } from '../screens/about/about.component';

const Stack = createStackNavigator();

export const MoodNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    {/*<Stack.Screen name='About' component={AboutScreen}/>*/}
    <Stack.Screen name='Home' component={MoodScreen}/>
  </Stack.Navigator>
);
