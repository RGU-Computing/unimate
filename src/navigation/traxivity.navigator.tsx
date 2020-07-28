import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { TraxivityTabs } from '../screens/traxivity/traxivity.tabs.component';
import { TraxivityTodayScreen } from '../screens/traxivity/traxivity.today.component';
import { TraxivityWeekScreen } from '../screens/traxivity/traxivity.week.component';
import { TraxivityMonthScreen } from '../screens/traxivity/traxivity.month.component';

const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const TraxivityMenuNavigator = (): React.ReactElement => (
  <TopTab.Navigator tabBar={(props) => <TraxivityTabs {...props}/>}>
    <TopTab.Screen name='Today' component={TraxivityTodayScreen}/>
    <TopTab.Screen name='Week' component={TraxivityWeekScreen}/>
    <TopTab.Screen name='Month' component={TraxivityMonthScreen}/>
  </TopTab.Navigator>
);

export const TraxivityNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name='Traxivity' component={TraxivityMenuNavigator}/>
  </Stack.Navigator>
);