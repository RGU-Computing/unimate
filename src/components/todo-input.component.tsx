import React, {useState} from 'react';
import {TouchableOpacity, View, TextInput, StyleSheet} from 'react-native';
// import { Text } from '@ui-kitten/components';
import {Icon, Text, Input, ListItem} from '@ui-kitten/components';

export const TodoInput = (props): React.ReactElement => {
  const [text, setText] = React.useState<string>('');

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Input
        style={{flex: 1, height: 40, fontSize: 14}}
        onChangeText={text => setText(text)}
        value={text}
        placeholder="Add a new task ..."
      />
      <TouchableOpacity
        style={{
          marginLeft: 8,
          padding: 8,
          backgroundColor: '#712177',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
        }}
        onPress={() => {
          props.onPress(text);
          setText('');
        }}>
        <Text
          style={{
            color: '#fafafa',
            marginHorizontal: 6,
            marginVertical: 2,
            fontSize: 20,
          }}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};
