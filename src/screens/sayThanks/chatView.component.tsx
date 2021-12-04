import { useNavigationState } from '@react-navigation/core';
import React, { FC, useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { FirebaseService } from '../../services/firebase.service';
import { firebase } from "@react-native-firebase/firestore";
import { GiftedChat } from 'react-native-gifted-chat';
import { AppStorage } from '../../services/app-storage.service'
import { Input, Card, TopNavigation } from '@ui-kitten/components';
import { StoredThanxMessage, ThanxMessage } from 'src/models/ThanxMessage';
// import {FirebaseService} from './../../services/firebase.service';
/**import { AppStorage } from './../../services/app-storage.service';

 * - SayThanx chat of a certain friend
 *
 */
interface ChatScreenProps { }
const messageMapper = (msg: StoredThanxMessage, toUID: string): ThanxMessage => {
  return {
    _id: 1,
    text: msg.text,
    createdAt: new Date(msg.timeStamp),
    user: {
      _id: msg.form,
      avatar: "s",
      name: "Friend"
    }
  }
}

// const mapMessages = (msgs:StoredThanxMessage[]):ThanxMessage[]=>msgs.map(messageMapper)

const ChatView: FC<ChatScreenProps> = () => {
  const { uid, displayName } = AppStorage.getUser();
  const [msg, setmsg] = useState<ThanxMessage[]>([

  ]);

  const params = useNavigationState<{ userId: string } | undefined>(
    state => state.routes[state.index].params,
  );

  useEffect(() => {
    const unsub = FirebaseService.setChatListener((doc) => {
      // user doc changed
      console.log("user doc changed!!");
      fetchChats();
    })

    return unsub
  }, [])

  const fetchChats = async () => {
    if (!params?.userId) {
      console.log("NO chatUID!", { params });

      return null;
    }
    if (!params.userId) {
      console.log("No to userId");

      return null
    }

    const sent = await FirebaseService.getSentChatsByReceiverId(params.userId);
    const received = await FirebaseService.getReceivedChats(params.userId);


    if (sent && received) {
      if (received.length == 1 && sent.lenth > 0) {

      }
    }

    console.log("sent", { sent, received })

    setmsg(sortMessages([...sent, ...received]))
  }
  const sortMessages = (messages: ThanxMessage[]) => {
    const sortedMessages = messages.map(message => {
      const time = message.createdAt.toDate();
      return ({ ...message, createdAt: time })
    }).sort((a, b) => b.createdAt - a.createdAt);
    console.log({ sortedMessages });
    return GiftedChat.append([], sortedMessages);
  }

  useEffect(() => {
    fetchChats();
  }, []);

  // useEffect(() => {
  //   if (params) {
  //     setmsg(prev => ({...prev, toUID: params.chatUID}));
  //   }
  // }, [params]);

  const handleMsgSend = ([msg]: ThanxMessage[]) => {

    const message = {
      ...msg, _id: params?.userId || msg[0]._id,
      createdAt: firebase.firestore.Timestamp.fromDate(msg.createdAt)
    }

    console.log('send msg', { message });

    const sendMsg = async (message: ThanxMessage) => {
      if (!params?.userId) return null;
      FirebaseService.sendChat(message)
    }

    sendMsg(message)

    setmsg(prev => GiftedChat.append(prev, [{ ...message, createdAt: message.createdAt.toDate() }]));


  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <TopNavigation
        title={displayName}
        titleStyle={{ color: 'white' }}
        style={{ backgroundColor: '#712177' }}
      />
      <GiftedChat

        // renderChatEmpty={
        // ()=>  <View>
        //     <Text>Yay! This is your first Thank to {params?.userId}</Text>
        //     <Button title="Be Friends" onPress={()=>{
        //       if(!params?.userId){
        //         console.log("No chat sender uId",);
        //         return null;
        //       }

        //       FirebaseService.sendChat({_id:AppStorage.getUser().uid, 
        //        createdAt:firebase.firestore.Timestamp.fromDate(new Date()),
        //        text:"Hello",
        //        user:{
        //         _id:params?.userId,
        //         avatar:"",
        //         name:"",  
        //        } 
        //     })
        //     }} />
        //   </View>
        // }
        messages={msg.map((el, i) => {
          // TODO handle date 
          return { ...el, _id: i }

        })}
        onSend={handleMsgSend}
        user={{
          _id: uid,
        }}
      />
    </View>
  );
};

export default ChatView;
