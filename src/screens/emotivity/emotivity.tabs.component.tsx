import {
  Tab,
  TabBar,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';
import {InfoIcon, MenuIcon} from '../../components/icons';

export const EmotivityTabs = ({navigation, state}): React.ReactElement => {
  const useForceUpdate = () => React.useState()[1];

  const onTabSelect = (index: number): void => {
    navigation.navigate(state.routeNames[index]);
  };

  const renderDrawerAction = (): React.ReactElement => (
    <TopNavigationAction icon={MenuIcon} onPress={navigation.toggleDrawer} />
  );

  const renderSOS = (): React.ReactElement => (
    <TopNavigationAction
      icon={InfoIcon}
      onPress={() => navigation.navigate('Health')}
    />
  );

  if (state.index === 1) {
    // useForceUpdate();
  }

  return (
    <>
      <TopNavigation
        title="eMotivity"
        leftControl={renderDrawerAction()}
        rightControls={[renderSOS()]}
        titleStyle={{ color: 'white' }}
        style={{ backgroundColor: '#7b187b' }}
      />
      {/* <Divider/> */}
      <TabBar
        style={styles.bar}
        /*tabBarStyle={styles.bar}*/
        indicatorStyle={styles.indicator}
        selectedIndex={state.index}
        onSelect={onTabSelect}>
        <Tab
          style={styles.tabToday}
          titleStyle={styles.title}
          title="Day Record"
        />
        <Tab style={styles.tabWeek} titleStyle={styles.title} title="Week" />
        <Tab
          style={styles.tabCustom}
          titleStyle={styles.title}
          title="Custom"
        />
      </TabBar>
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
    backgroundColor: '#712177',
    paddingBottom: 0,
    paddingTop: 0,
  },
  title: {
    fontWeight: 'bold',
  },
  tab: {},
  tabToday: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
  },
  tabWeek: {
    backgroundColor: '#FFFFFF',
  },
  tabCustom: {
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 30,
  },
});
