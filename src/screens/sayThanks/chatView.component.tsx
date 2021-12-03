import {useNavigationState} from '@react-navigation/core';
import React, {FC, useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {FirebaseService} from '../../services/firebase.service';
import {GiftedChat} from 'react-native-gifted-chat';
import { AppStorage } from '../../services/app-storage.service'
import {Input} from '@ui-kitten/components';
import { StoredThanxMessage, ThanxMessage } from 'src/models/ThanxMessage';
// import {FirebaseService} from './../../services/firebase.service';
/**import { AppStorage } from './../../services/app-storage.service';

 * - SayThanx chat of a certain friend
 *
 */
interface ChatScreenProps {}
const messageMapper = (msg:StoredThanxMessage,toUID:string):ThanxMessage=>{
  return {
    _id:1,
    text:msg.text,
    createdAt: new Date(msg.timeStamp),
    user:{
      _id:msg.form,
      avatar:"s",
      name:"Friend"
    }
  }
}

// const mapMessages = (msgs:StoredThanxMessage[]):ThanxMessage[]=>msgs.map(messageMapper)

const ChatView: FC<ChatScreenProps> = () => {
  const {uid} = AppStorage.getUser();
  const [msg, setmsg] = useState<ThanxMessage[]>([
    {
      _id: 1,
      text: 'Hello developer',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
  ]);

  const params = useNavigationState<{userId: string} | undefined>(
    state => state.routes[state.index].params,
  );

  useEffect(() => {
    if(!params?.userId) {
      console.log("NO chatUID!",{params});
        
      return null;
    }

    const fetchChats =async ()=>{
      if(!params.userId){
        console.log("No to userId");
        
        return null
      }
      
      const sent = await FirebaseService.getSentChatsByReceiverId(params?.userId);
      const received = await FirebaseService.getReceivedChats()[params.userId];

     
      console.log("sent",{sent,received})
      if(sent )
      setmsg(GiftedChat.append([],[...sent||[],...received||[]]))
    }

    fetchChats();
  }, []);

    // useEffect(() => {
    //   if (params) {
    //     setmsg(prev => ({...prev, toUID: params.chatUID}));
    //   }
    // }, [params]);

  const handleMsgSend = (mesgs: ThanxMessage[]) => {
    const message = {...mesgs[0], _id:params?.userId||mesgs[0]._id }
    console.log('send msg', {message});
    const sendMsg = async (message:ThanxMessage) =>{
      if(!params?.userId) return null;
      FirebaseService.sendChat(message)
    }

    sendMsg(message)
    
    setmsg(prev => GiftedChat.append(prev,[message]));


  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* <Text>Chat Screen: {params && params.chatUID}</Text>
      <Input
        value={msg.text}
        placeholder="message"
        onChangeText={text => {
          setmsg(prev => ({...prev, text}));
        }}
      />
      <Button
        title="Send"
        onPress={() => {
          FirebaseService.sendChat(msg).then(() =>
            setmsg(prev => ({...prev, text: ''})),
          );
        }}
      /> */}
      <GiftedChat
        messages={msg}
        onSend={handleMsgSend}
        user={{
          _id: uid,
        }}
      />
    </View>
  );
};

export default ChatView;
