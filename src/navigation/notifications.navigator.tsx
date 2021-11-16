import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NotificationsScreen} from '../screens/notifications/notifications.component';

const Stack = createStackNavigator();

export const NotificationsNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
  </Stack.Navigator>
);
