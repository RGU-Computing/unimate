import {ListItem, CheckBox} from '@ui-kitten/components';
import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
// import { Text } from '@ui-kitten/components';

export const TodoItem = (props): React.ReactElement => {
  const [text, setText] = React.useState<string>('');
  const [checked, setChecked] = React.useState(false);

  const clickCheckBox = async _nextCheked => {
    setChecked(_nextCheked);
    props.completeFunction();
  };

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
      }}>
      <CheckBox
        style={styles.checkbox}
        status="primary"
        // checked={props.item.completed}>
        checked={props.item.completed}
        onChange={nextChecked => clickCheckBox(nextChecked)}
      />

      <Text style={[{marginHorizontal: 16, fontSize: 14}]}>
        🔒 {props.item.text}
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
