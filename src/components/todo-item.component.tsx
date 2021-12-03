import {CheckBox} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {UtilService} from '../services/util.service';
// import { Text } from '@ui-kitten/components';

export const TodoItem = (props): React.ReactElement => {
  const [] = React.useState<string>('');
  const [checked, setChecked] = React.useState(false);

  const isOverdue = new Date(props.item.deadline).getTime() < Date.now();

  const clickCheckBox = async _nextCheked => {
    setChecked(_nextCheked);
    console.log(checked);
    props.completeFunction();
  };

  useEffect(() => {
    if (isOverdue) {
      PushNotification.localNotificationSchedule({
        channelId: 'reminders',
        title: '🕙 Overdue TODO task',
        message: props.item.text,
        date: new Date(Date.now() + 60 * 1000),
        allowWhileIdle: true,
      });
    }
  }, [isOverdue, props.item.text]);

  return (
    <TouchableOpacity
      onPress={() => props.completeFunction()}
      style={{
        paddingVertical: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 6,
        borderColor: '#DDD',
        borderWidth: 1,
        backgroundColor: isOverdue ? 'red' : '',
      }}>
      <CheckBox
        style={styles.checkbox}
        status="primary"
        // checked={props.item.completed}>
        checked={props.item.completed}
        onChange={nextChecked => clickCheckBox(nextChecked)}
      />

      <Text style={[{marginHorizontal: 16, fontSize: 14}]}>
        🔒{' '}
        {`${props.item.text} ${
          isOverdue
            ? `- ${UtilService.getDateFromDatabaseDateFormat(props.item.date)}`
            : ''
        }`}
      </Text>
      <TouchableOpacity
        style={{
          marginHorizontal: 16,
          padding: 4,
          backgroundColor: '#7F8283',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
        }}
        onPress={() => props.deleteFunction()}>
        <Text
          style={{color: '#fafafa', marginHorizontal: 6, marginVertical: 1}}>
          X
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    marginTop: 2,
    marginBottom: 2,
    marginLeft: 8,
  },
});
