import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Avatar, ListItem, ListItemProps, Text } from '@ui-kitten/components';
import { MailIcon } from './icons';
import { Notification } from '../models/notification';
import moment from 'moment';

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

  const renderProfileAvatar = (): React.ReactElement => (
    <Avatar
      style={styles.avatar}
      source={notification.type === 'Traxivity' ? require('../assets/images/traxivity.png') : require('../assets/images/emotivity.png')}
    />
  );

  return (
    <ListItem
      {...listItemProps}
      title={notification.title}
      description={notification.subtitle}
      icon={renderProfileAvatar}
      accessory={renderMessageDate}
    />
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
