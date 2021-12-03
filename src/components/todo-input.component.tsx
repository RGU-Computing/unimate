// import { Text } from '@ui-kitten/components';
import {
  Datepicker,
  Divider,
  Icon,
  Input,
  Layout,
  Text,
} from '@ui-kitten/components';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

export const TodoInput = (props): React.ReactElement => {
  const [text, setText] = React.useState<string>('');

  const [date, setDate] = React.useState(null);

  const CalendarIcon = style => <Icon {...style} name="calendar" />;

  return (
    <View>
      <Input
        style={{height: 40, fontSize: 14}}
        onChangeText={text => setText(text)}
        value={text}
        placeholder="Add a new task ..."
      />
      <Divider />
      <Layout style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Datepicker
          placeholder="Deadline"
          date={date}
          onSelect={setDate}
          icon={CalendarIcon}
          style={{flex: 1}}
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
            props.onPress({text, date});
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
      </Layout>
    </View>
  );
};
