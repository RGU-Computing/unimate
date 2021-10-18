import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Avatar, ListItem, ListItemProps, Text } from '@ui-kitten/components';
import { MailIcon } from './icons';
import { Notification } from '../models/notification';
import moment from 'moment';
import { AppStorage } from '../services/app-storage.service';

export type MessageItemProps = ListItemProps & {
    notification: Notification
};

export const NotificationItem = (props: MessageItemProps): React.ReactElement => {

  const { notification, ...listItemProps } = props;

  const renderMessageDate = (style: ViewStyle, index: number): React.ReactElement => (
    <View style={styles.dateContainer}>
      {notification.isImportant && <MailIcon/>}
      <Text
        style={styles.dateText}
        appearance='hint'
        category='c1'>
        {moment(notification.timestamp).fromNow()}
      </Text>
    </View>
  );

 
  const deleteNotification = async _index => {
    console.log("inside delete notification")
    const temp = await AppStorage.getNotificationsList();
    let tempArr = [...temp];
    tempArr.splice(_index, 1);
    await AppStorage.saveNotificationsList(tempArr);
    // setTodoItems(tempArr);
  };

  const renderProfileAvatar = (): React.ReactElement => (
    <Avatar
      style={styles.avatar}
      source={notification.type == 'Traxivity' ? require('../assets/images/traxivity.png') : notification.type == 'Emotivity' ? require('../assets/images/emotivity.png') : require('../assets/images/gratitude.jpg')}
    />
  );

  return (
    // <TouchableOpacity
    // onPress={() => console.log("KKKKKKKK")}>
    <ListItem
      {...listItemProps}
      title={notification.title}
      description={notification.subtitle}
      icon={renderProfileAvatar}
      accessory={renderMessageDate}
    />
    //  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    tintColor: null,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    textAlign: 'right',
    minWidth: 64,
  },
});
