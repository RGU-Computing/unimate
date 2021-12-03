import React from 'react';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {SayThanksScreen} from '../screens/sayThanks/saythanx.component';
import ChatView from '../screens/sayThanks/chatView.component';

// const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const SayThanksStack = createStackNavigator();
// const SaythanxMenuNavigator = (): React.ReactElement => (
//   <TopTab.Navigator>
//     <TopTab.Screen name="Today" component={SaythanxTodayScreen} />
//     <TopTab.Screen name="History" component={SaythanxHistoryScreen} />
//   </TopTab.Navigator>
// );
const SayThankSChatNavigator = (): React.ReactElement => {
  return (
    <SayThanksStack.Navigator headerMode="none" initialRouteName="Home">
      <SayThanksStack.Screen name="Chat" component={ChatView} />
      <SayThanksStack.Screen name="Home" component={SayThanksScreen} />
    </SayThanksStack.Navigator>
  );
};

export const SaythanxNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="SayThanx" component={SayThankSChatNavigator} />
  </Stack.Navigator>
);
