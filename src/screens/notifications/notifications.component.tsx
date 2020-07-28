import React from 'react';
import { ScrollView, StyleSheet, ListRenderItemInfo, View, ActivityIndicator } from 'react-native';
import { Divider, List, TopNavigation, TopNavigationAction, Layout, Icon } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { MenuIcon, InfoIcon } from '../../components/icons';
import { NotificationItem } from '../../components/notification.component';
import { Notification } from '../../models/notification';
import { FirebaseService } from '../../services/firebase.service';

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
    this.state = {
      loading: true,
      notifications: []
    }
    this.renderItem = this.renderItem.bind(this)
  }

  componentDidMount() {
    FirebaseService.subscribeForNotifications(this.onSuccess);
  }

  onSuccess = (querySnapshot) => {
    this.setState({notifications: querySnapshot.data().notifications.reverse(), loading: false});
  }

  renderDrawerAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={this.props.navigation.toggleDrawer}
    />
  );

  renderSOS = (): React.ReactElement => (
    <TopNavigationAction
        icon={InfoIcon}
        onPress={() => this.props.navigation.navigate('Health')}
    />
  );

  renderItem (info: ListRenderItemInfo<Notification>) {
    return(
      <NotificationItem
        style={styles.item}
        notification={info.item}
        /*onPress={onItemPress}*/
      />
    )
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

  StarIcon = (style) => (
    <Icon {...style} width={30} height={30} name='phone-call-outline'/>
  );

  render() {
    if (this.state.loading) {
      return (
        <SafeAreaLayout
          style={styles.safeArea}
          insets='top'>
          <TopNavigation
            title='Notifications'
            leftControl={this.renderDrawerAction()}
            rightControls={[this.renderSOS()]}
          />
          <Divider/>
          <Layout>
            <View style={styles.loading}>
              <ActivityIndicator size='large' color="#712177" />
            </View>
          </Layout>
        </SafeAreaLayout>
      );
    }
    return (
      <SafeAreaLayout
        style={styles.safeArea}
        insets='top'>
        <TopNavigation
          title='Notifications'
          leftControl={this.renderDrawerAction()}
          rightControls={[this.renderSOS()]}
        />
        <Divider/>
        <Layout>
          <ScrollView style={styles.container}>
            <List
              style={styles.list}
              data={this.state.notifications}
              renderItem={this.renderItem}
            />
          </ScrollView>
          {/*<Button style={styles.button} onPress={() => this.props.navigation.navigate('Health')} status='danger'>SOS</Button>*/}
        </Layout>
      </SafeAreaLayout>
    );
  }
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  loading: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginHorizontal: 24
  },
  container: {
    //height: (Dimensions.get('window').height/3)-10,
    height: '100%'
  },
  list: {
    flex: 1
  },
  item: {
    paddingBottom: 10,
    //borderTopWidth: 1,
    //borderTopColor: '#EAF0F4',
    borderBottomWidth: 1,
    borderBottomColor: '#EAF0F4',
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
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 50,
    position: 'absolute',                                          
    bottom: 80,                                                    
    right: 30,
  }
});