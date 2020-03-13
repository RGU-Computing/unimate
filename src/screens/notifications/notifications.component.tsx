import React from 'react';
import { StyleSheet, ListRenderItemInfo, Dimensions } from 'react-native';
import {
  Divider,
  List,
  TopNavigation,
  TopNavigationAction,
  Text,
  Layout,
} from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { MenuIcon } from '../../components/icons';
import { NotificationItem } from '../../components/notification.component';
import { Notification } from '../../models/notification';
import { ScrollView } from 'react-native';

const renderItem = (info: ListRenderItemInfo<Notification>): React.ReactElement => (
  <NotificationItem
    style={styles.item}
    notification={info.item}
    /*onPress={onItemPress}*/
  />
);

export class NotificationsScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  initialMessages: Notification[] = [
    Notification.first(),
    Notification.second(),
    Notification.third(),
    Notification.fourth(),
  ];

  renderDrawerAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={this.props.navigation.toggleDrawer}
    />
  );

  renderItem (info: ListRenderItemInfo<Notification>) {
    <NotificationItem
      style={styles.item}
      notification={info.item}
      /*onPress={onItemPress}*/
    />
  }

  onItemPress() {
    
  }

  /*renderHeader () {
    <Layout
      style={styles.header}
      level='1'>
      <Input
        placeholder='Search'
        value={searchQuery}
        icon={SearchIcon}
      />
    </Layout>
  }*/

  render() {
    return (
      <SafeAreaLayout
        style={styles.safeArea}
        insets='top'>
        <TopNavigation
          title='Notifications'
          leftControl={this.renderDrawerAction()}
        />
        
        <Layout>
          <Text style={styles.title}>Traxivity</Text>
          <ScrollView style={styles.container}>
            <List
              style={styles.list}
              data={this.initialMessages}
              renderItem={renderItem}
            />
          </ScrollView>
          <Text style={styles.title}>Emotivity</Text>
          <ScrollView style={styles.container}>
            <List
              style={styles.list}
              data={this.initialMessages}
              renderItem={renderItem}
            />
          </ScrollView>
        </Layout>
      </SafeAreaLayout>
    );
  }

};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    height: (Dimensions.get('window').height/3)-10,
  },
  list: {
    flex: 1
  },
  item: {
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#EAF0F4',
    //borderBottomWidth: 1,
    //borderBottomColor: theme['background-basic-color-3'],
  },
  title: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: 'center',
    //borderBottomWidth: 1,
    //borderBottomColor: '#ced5dd',
    borderTopWidth: 1,
    borderTopColor: '#ced5dd'
  }
});