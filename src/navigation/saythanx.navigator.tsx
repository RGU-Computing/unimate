import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SaythanxTabs } from '../screens/saythanx/saythanx.tabs.component';
import { SaythanxTodayScreen } from '../screens/saythanx/saythanx.today.component';
import { SaythanxHistoryScreen } from '../screens/saythanx/saythanx.history.component';

const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const SaythanxMenuNavigator = (): React.ReactElement => (
  <TopTab.Navigator tabBar={(props) => <SaythanxTabs {...props}/>}>
    <TopTab.Screen name='Today' component={SaythanxTodayScreen}/>
    <TopTab.Screen name='History' component={SaythanxHistoryScreen}/>
  </TopTab.Navigator>
);

export const SaythanxNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name='SayThanx' component={SaythanxMenuNavigator}/>
  </Stack.Navigator>
);