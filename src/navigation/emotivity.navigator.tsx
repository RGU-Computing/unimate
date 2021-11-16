import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {EmotivityTabs} from '../screens/emotivity/emotivity.tabs.component';
import {EmotivityTodayScreen} from '../screens/emotivity/emotivity.today.component';
import {EmotivityWeekScreen} from '../screens/emotivity/emotivity.week.component';
import {EmotivityCustomScreen} from '../screens/emotivity/emotivity.custom.component';

const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const EmotivityMenuNavigator = (): React.ReactElement => (
  <TopTab.Navigator tabBar={props => <EmotivityTabs {...props} />}>
    <TopTab.Screen name="Today" component={EmotivityTodayScreen} />
    <TopTab.Screen name="Week" component={EmotivityWeekScreen} />
    <TopTab.Screen name="Custom" component={EmotivityCustomScreen} />
  </TopTab.Navigator>
);

export const EmotivityNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Emotivity" component={EmotivityMenuNavigator} />
  </Stack.Navigator>
);
