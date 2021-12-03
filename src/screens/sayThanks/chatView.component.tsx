import {Text} from '@ui-kitten/components';
import React, {FC} from 'react';
import {View} from 'react-native';
interface ChatScreenProps {}

const ChatView: FC<ChatScreenProps> = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text>Chat Screen</Text>
    </View>
  );
};

export default ChatView;
