import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Avatar,
  Divider,
  Drawer,
  DrawerElement,
  DrawerHeaderElement,
  DrawerHeaderFooter,
  DrawerHeaderFooterElement,
  Layout,
  MenuItemType,
  Text,
} from '@ui-kitten/components';
import { AboutIcon, GlobeIcon } from '../../components/icons';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { WebBrowserService } from '../../services/web-browser.service';
import { AppInfoService } from '../../services/app-info.service';
import { AppStorage } from '../../services/app-storage.service';

const DATA: MenuItemType[] = [
  { title: 'About Unimate', icon: AboutIcon },
  { title: 'Visit Unimate Website', icon: GlobeIcon },
  { title: 'Robert Gordon University Website', icon: GlobeIcon },
];

const version: string = AppInfoService.getVersion();

export const BaseDrawer = ({ navigation }): DrawerElement => {

  const onItemSelect = (index: number): void => {
    switch (index) {
      case 0: {
        navigation.toggleDrawer();
        navigation.navigate('About');
        return;
      }
      case 1: {
        WebBrowserService.openBrowserAsync('https://unimate.app/');
        navigation.toggleDrawer();
        return;
      }
      case 2: {
        WebBrowserService.openBrowserAsync('http://www.comp.rgu.ac.uk/');
        navigation.toggleDrawer();
        return;
      }
    }
  };

  const renderHeader = (): DrawerHeaderElement => (
    <Layout
      style={styles.header}
      level='2'>
      <View style={styles.profileContainer}>
        <Avatar
          size='giant'
          source={{ uri: AppStorage.getUser().photoURL }}
          style={{borderRadius: 5}}
        />
        <Text
          style={styles.profileName}
          category='h6'>
          {AppStorage.getUser().displayName}
        </Text>
      </View>
    </Layout>
  );

  const renderFooter = (): DrawerHeaderFooterElement => (
    <React.Fragment>
      <Divider/>
      <DrawerHeaderFooter
        disabled={true}
        description={'Copyright © 2020 Robert Gordon University'}
      />
    </React.Fragment>
  );

  return (
    <SafeAreaLayout
      style={styles.safeArea}
      insets='top'>
      <Drawer
        header={renderHeader}
        footer={renderFooter}
        data={DATA}
        onSelect={onItemSelect}
      />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    height: 128,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    marginHorizontal: 16,
  },
});
