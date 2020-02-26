import React from 'react';
import { RouteProp } from '@react-navigation/core';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MoodNavigator } from './mood.navigator';
//import { LayoutsNavigator } from './layouts.navigator';
//import { ComponentsNavigator } from './components.navigator';
//import { ThemesNavigator } from './themes.navigator';
import { BaseBottomNavigation } from '../screens/base/base-bottom-navigation.component';
import { BaseDrawer } from '../screens/base/base-drawer.component';
//import { LibrariesScreen } from '../scenes/libraries/libraries.component';

const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

/*
 * When dev is true in .expo/settings.json (started via `start:dev`),
 * open Components tab as default.
 */
const initialTabRoute: string = __DEV__ ? 'Mood' : 'Mood';

/*
 * Can we access it from `BaseNavigator`?
 */
const ROOT_ROUTES: string[] = ['Base', 'Mood', 'Traxivity', 'Emotivity', 'Notifications', 'Health'];

const isOneOfRootRoutes = (currentRoute: RouteProp<any, any>): boolean => {
  return ROOT_ROUTES.find(route => currentRoute.name === route) !== undefined;
};

const TabBarVisibleOnRootScreenOptions = ({ route }): BottomTabNavigationOptions => {
  const currentRoute = route.state && route.state.routes[route.state.index];
  return { tabBarVisible: currentRoute && isOneOfRootRoutes(currentRoute) };
};

const BaseTabsNavigator = (): React.ReactElement => (
  <BottomTab.Navigator
    screenOptions={TabBarVisibleOnRootScreenOptions}
    initialRouteName={initialTabRoute}
    tabBar={props => <BaseBottomNavigation {...props} />}>
    <BottomTab.Screen name='Mood' component={MoodNavigator}/>
    {/*<BottomTab.Screen name='Traxivity' component={ComponentsNavigator}/>
    <BottomTab.Screen name='Notifications' component={ThemesNavigator}/>
<BottomTab.Screen name='Health' component={ThemesNavigator}/>*/}
  </BottomTab.Navigator>
);

export const BaseNavigator = (): React.ReactElement => (
  <Drawer.Navigator
    screenOptions={{ gestureEnabled: false }}
    drawerContent={props => <BaseDrawer {...props}/>}>
    <Drawer.Screen name='Base' component={BaseTabsNavigator}/>
    {/*<Drawer.Screen name='Libraries' component={LibrariesScreen}/>*/}
  </Drawer.Navigator>
);
