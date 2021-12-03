import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SayThanksScreen} from '../screens/sayThanks/saythanx.component';
import ChatView from '../screens/sayThanks/chatView.component';

const Stack = createStackNavigator();
const SayThanksStack = createStackNavigator();

const SayThankSChatNavigator = (): React.ReactElement => {
  return (
    <SayThanksStack.Navigator headerMode="none" initialRouteName="Index">
      <SayThanksStack.Screen name="Chat" component={ChatView} />
      <SayThanksStack.Screen name="Index" component={SayThanksScreen} />
    </SayThanksStack.Navigator>
  );
};

export const SaythanxNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="SayThanx" component={SayThankSChatNavigator} />
  </Stack.Navigator>
);
