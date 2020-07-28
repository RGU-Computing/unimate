import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Tab, TopNavigation, TopNavigationAction, Divider, TabBar } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { MenuIcon, InfoIcon } from '../../components/icons';

export const EmotivityTabs = ({ navigation, state }): React.ReactElement => {

    const useForceUpdate = () => React.useState()[1];

    const onTabSelect = (index: number): void => {
      navigation.navigate(state.routeNames[index]);
    };

    const renderDrawerAction = (): React.ReactElement => (
        <TopNavigationAction
          icon={MenuIcon}
          onPress={navigation.toggleDrawer}
        />
    );

    const renderSOS = (): React.ReactElement => (
        <TopNavigationAction
            icon={InfoIcon}
            onPress={() => navigation.navigate('Health')}
        />
    );

    if (state.index === 1) {
        useForceUpdate();
    }
  
    return (
      <>
        <TopNavigation
            title='Emotivity'
            leftControl={renderDrawerAction()}
            rightControls={[renderSOS()]}
        />
        <Divider/>
        <TabBar
            style={styles.bar}
            /*tabBarStyle={styles.bar}*/
            indicatorStyle={styles.indicator}
            selectedIndex={state.index}
            onSelect={onTabSelect}>
            <Tab style={styles.tab} titleStyle={styles.title} title='Today'/>
            <Tab style={styles.tab} titleStyle={styles.title} title='Week'/>
            <Tab style={styles.tab} titleStyle={styles.title} title='Custom'/>
        </TabBar>
      </>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    indicator: {
        borderRadius: 0
    },
    bar: {
        height: 50,
    },
    title: {
        fontWeight: 'bold'
    },
    tab: {
    }
});