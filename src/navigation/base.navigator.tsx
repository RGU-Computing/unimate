import React from 'react';
import {RouteProp} from '@react-navigation/core';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {MoodNavigator} from './mood.navigator';
import {TraxivityNavigator} from './traxivity.navigator';
import {EmotivityNavigator} from './emotivity.navigator';
import {SaythanxNavigator} from './saythanx.navigator';
import {NotificationsNavigator} from './notifications.navigator';
import {HealthNavigator} from './health.navigator';
import {BaseBottomNavigation} from '../screens/base/base-bottom-navigation.component';
import {BaseDrawer} from '../screens/base/base-drawer.component';
import {AboutScreen} from '../screens/about/about.component';
//import { LibrariesScreen } from '../scenes/libraries/libraries.component';

const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

/*
 * When dev is true in .expo/settings.json (started via `start:dev`),
 * open Components tab as default.
 */
const initialTabRoute: string = __DEV__ ? 'Home' : 'Home';

/*
 * Can we access it from `BaseNavigator`?
 */
const ROOT_ROUTES: string[] = [
  'Base',
  'Home',
  'Traxivity',
  'Emotivity',
  'SayThanx',
  'Notifications',
  'Health',
  'About',
];

const isOneOfRootRoutes = (currentRoute: RouteProp<any, any>): boolean => {
  return ROOT_ROUTES.find(route => currentRoute.name === route) !== undefined;
};

const TabBarVisibleOnRootScreenOptions = ({
  route,
}): BottomTabNavigationOptions => {
  const currentRoute = route.state && route.state.routes[route.state.index];
  return {tabBarVisible: currentRoute && isOneOfRootRoutes(currentRoute)};
};

const BaseTabsNavigator = (): React.ReactElement => (
  <BottomTab.Navigator
    screenOptions={TabBarVisibleOnRootScreenOptions}
    initialRouteName={initialTabRoute}
    tabBar={props => <BaseBottomNavigation {...props} />}>
    <BottomTab.Screen name="Home" component={MoodNavigator} />
    <BottomTab.Screen name="Emotivity" component={EmotivityNavigator} />
    <BottomTab.Screen name="SayThanx" component={SaythanxNavigator} />
    <BottomTab.Screen name="Traxivity" component={TraxivityNavigator} />
    <BottomTab.Screen name="Notifications" component={NotificationsNavigator} />
    <BottomTab.Screen name="Health" component={HealthNavigator} />
  </BottomTab.Navigator>
);

export const BaseNavigator = (): React.ReactElement => (
  <Drawer.Navigator
    screenOptions={{gestureEnabled: true}}
    drawerContent={props => <BaseDrawer {...props} />}>
    <Drawer.Screen name="Base" component={BaseTabsNavigator} />
    <Drawer.Screen name="About" component={AboutScreen} />
    {/*<Drawer.Screen name='Libraries' component={LibrariesScreen}/>*/}
  </Drawer.Navigator>
);
