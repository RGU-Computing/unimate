import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Avatar, ListItem, ListItemProps, Text } from '@ui-kitten/components';
import { MailIcon } from './icons';
import { Notification } from '../models/notification';

export type MessageItemProps = ListItemProps & {
    notification: Notification;
};

export const NotificationItem = (props: MessageItemProps): React.ReactElement => {

  const { notification, ...listItemProps } = props;

  const renderMessageDate = (style: ViewStyle, index: number): React.ReactElement => (
    <View style={styles.dateContainer}>
      {!notification.isRead && <MailIcon/>}
      <Text
        style={styles.dateText}
        appearance='hint'
        category='c1'>
        {notification.date}
      </Text>
    </View>
  );

  const renderProfileAvatar = (): React.ReactElement => (
    <Avatar
      style={styles.avatar}
      source={require('../assets/images/image-app-icon.png')}
    />
  );

  return (
    <ListItem
      {...listItemProps}
      title={notification.title}
      description={notification.formattedText}
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
