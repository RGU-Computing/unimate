import React from 'react';
import {
  ScrollView,
  StyleSheet,
  ListRenderItemInfo,
  View,
  ActivityIndicator,
  TouchableOpacityBase,
  TouchableOpacity,
} from 'react-native';
import {
  Divider,
  List,
  TopNavigation,
  TopNavigationAction,
  Layout,
  Icon,
  Button,
  Text,
  Avatar,
} from '@ui-kitten/components';
import {SafeAreaLayout} from '../../components/safe-area-layout.component';
import {MenuIcon, InfoIcon} from '../../components/icons';
import {NotificationItem} from '../../components/notification.component';
import {Notification} from '../../models/notification';
import {FirebaseService} from '../../services/firebase.service';
import {faHistory} from '@fortawesome/free-solid-svg-icons';
import {AppStorage} from '../../services/app-storage.service';

const renderItem = (
  info: ListRenderItemInfo<Notification>,
): React.ReactElement => (
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
      loading: false,
      notifications: [],
    };
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    this.setInitialNotificationsList();
    console.log(this.state.notifications);
    // FirebaseService.subscribeForNotifications(this.onSuccess);
  }

  // onSuccess = (querySnapshot) => {
  //   // this.setState({notifications: querySnapshot.data().notifications.reverse(), loading: false});

  //   // console.log("AAAAAAAAAAAAAAAAAAAAAA")
  //   // console.log(this.state.notifications)

  // }

  setInitialNotificationsList = async () => {
    const initialNotificationsList = await AppStorage.getNotificationsList();
    if (initialNotificationsList != null) {
      this.setState({notifications: initialNotificationsList});
    }
  };

  deleteNotification = async _index => {
    console.log('inside delete notification');
    const temp = await AppStorage.getNotificationsList();
    let tempArr = [...temp];
    tempArr.splice(_index, 1);
    await AppStorage.saveNotificationsList(tempArr);
    // setTodoItems(tempArr);
    this.setState({notifications: tempArr});
  };

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

  renderItem(info: ListRenderItemInfo<Notification>) {
    console.log('INNNNFFOOOOO');
    console.log(info.item);
    console.log(new Date(info.item.timestamp).getHours());
    return (
      <View>
        <NotificationItem
          style={styles.item}
          notification={info.item}
          onPress={() => this.deleteNotification(info.index)}
          // deleteFunction={() => this.deleteNotification(info.index)}
          /*onPress={onItemPress}*/
        />
      </View>
      // </TouchableOpacity>
    );
  }

  onItemPress() {}

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

  StarIcon = style => (
    <Icon {...style} width={30} height={30} name="phone-call-outline" />
  );

  render() {
    if (this.state.loading) {
      return (
        <SafeAreaLayout style={styles.safeArea} insets="top">
          <TopNavigation
            title="Notifications"
            leftControl={this.renderDrawerAction()}
            rightControls={[this.renderSOS()]}
          />
          <Divider />
          <Layout>
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="#712177" />
            </View>
          </Layout>
        </SafeAreaLayout>
      );
    }
    return (
      <SafeAreaLayout style={styles.safeArea} insets="top">
        <TopNavigation
          title="Notifications"
          leftControl={this.renderDrawerAction()}
          rightControls={[this.renderSOS()]}
        />
        <Divider />
        <Layout>
          <ScrollView style={styles.container}>
            {this.state.notifications.length > 0 && (
              <List
                style={styles.list}
                data={this.state.notifications}
                renderItem={this.renderItem}
              />
            )}
            {this.state.notifications.length == 0 && (
              <View style={{marginVertical:'50%'}}>
                <Avatar
                  style={{height: 100, width: 100, alignSelf: 'center'}}
                  source={require('../../assets/images/completeTick.png')}
                />
                <Text
                  style={{
                    marginTop: '10%',
                    textAlign: 'center',
                    // fontWeight: 'bold',
                    fontSize: 20,
                  }}>
                  Hooray! 🥳
                </Text>
                <Text
                  style={{
                    marginTop: '2%',
                    textAlign: 'center',
                    // fontWeight: 'bold',
                    fontSize: 20,
                  }}>
                  You're All Caught Up! 🎉
                </Text>
              </View>
            )}
          </ScrollView>
        </Layout>
      </SafeAreaLayout>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  loading: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginHorizontal: 24,
  },
  container: {
    //height: (Dimensions.get('window').height/3)-10,
    height: '100%',
  },
  list: {
    flex: 1,
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
    borderTopColor: '#ced5dd',
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 50,
    position: 'absolute',
    bottom: 80,
    right: 30,
  },
});
