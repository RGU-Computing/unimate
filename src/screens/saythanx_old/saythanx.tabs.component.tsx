import {useNavigation, useNavigationState} from '@react-navigation/core';
import {
  Tab,
  TabBar,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {InfoIcon, MenuIcon} from '../../components/icons';
export const SaythanxTabs = ({navigation, state}): React.ReactElement => {
  // const useForceUpdate = () => React.useState()[1];
  console.log('NAVIGATION', {navigation, state});
  const nav = useNavigation();
  const index = useNavigationState(nState => nState.index);
  const rNames = useNavigationState(nState => nState.routeNames);

  const onTabSelect = (index: number): void => {
    nav.navigate(rNames[index]);
  };

  const renderDrawerAction = (): React.ReactElement => (
    <TopNavigationAction icon={MenuIcon} onPress={(nav as any).toggleDrawer} />
  );

  const renderSOS = (): React.ReactElement => (
    <TopNavigationAction
      icon={InfoIcon}
      onPress={() => navigation.navigate('Health')}
    />
  );

  // if (state.index === 1) {
  //   console.log('state index == 1');

  //   useForceUpdate();
  // }

  return (
    <>
      <View>
        <TopNavigation
          title="SayThanx"
          leftControl={renderDrawerAction()}
          rightControls={[renderSOS()]}
          titleStyle={{color: 'white'}}
          style={{backgroundColor: '#712177'}}
        />
        {/* <Divider/> */}
        <TabBar
          style={styles.bar}
          /*tabBarStyle={styles.bar}*/
          indicatorStyle={styles.indicator}
          selectedIndex={index}
          onSelect={onTabSelect}>
          <Tab
            style={styles.tabToday}
            titleStyle={styles.title}
            title="Today"
          />
          <Tab
            style={styles.tabHistory}
            titleStyle={styles.title}
            title="History"
          />
        </TabBar>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  indicator: {
    borderRadius: 0,
  },
  bar: {
    height: 50,
    // borderTopLeftRadius:30,
    // borderTopRightRadius:30,
    backgroundColor: '#712177',
    paddingBottom: 0,
    paddingTop: 0,
  },
  title: {
    fontWeight: 'bold',
  },
  tabToday: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
  },
  tabHistory: {
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 30,
  },
});
