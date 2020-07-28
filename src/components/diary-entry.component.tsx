import React, { useEffect } from 'react';
import { View, TouchableHighlight, Animated, Platform, Keyboard, ActivityIndicator } from 'react-native';
import { CardElement, CardProps, StyleService, Text, useStyleSheet, Button, Input, Layout, Avatar } from '@ui-kitten/components';
import { ArrowHeadDownIcon, ArrowHeadUpIcon, PaperPlaneIcon } from './icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Chat } from './chat.component';
import { KeyboardAvoidingView } from './keyboard-avoiding-view.component';
import { Message } from '../models/message';
import { ScrollView } from 'react-native-gesture-handler';
import { UtilService } from '../services/util.service';
import { DIARY } from '../services/types';
import { FirebaseService } from '../services/firebase.service';

export interface DiaryEntryProps extends Omit<CardProps, 'children'> {
  entry: {}
}

const keyboardOffset = (height: number): number => Platform.select({
    android: 0,
    ios: height,
  });

const initialMessages: Message[]= [
    new Message('What happened?', '4:00 PM', false),
    new Message('I cried.', '4:15 PM', true),
    new Message('Where did this take place?', '4:19 PM', false),
    new Message('At home.', '4:20 PM', true),
    new Message('What were your thoughts at the time?', '4:30 PM', false),
    new Message('I felt anxious because my thesis submission is on next week and i don\'t think that i would be able to finish it on time.', '4:35 PM', true),
    new Message('What were your thoughts after reflecting and how did you feel after that?', '4:30 PM', false),
]

export const DiaryEntry = (props: DiaryEntryProps): CardElement => {

  const styles = useStyleSheet(themedStyles);

  const { entry, style, ...restProps } = props;

  const [expanded, setExpanded] = React.useState<boolean>(false);

  const [reflected, setReflected] = React.useState<boolean>(false);

  const [animation] = React.useState(new Animated.Value(45));

  const [maxHeight, setMaxHeight] = React.useState<number>(200);

  const [minHeight, setMinHeight] = React.useState<number>(45);

  const [visible, setVisible] = React.useState<boolean>(false);

  const [messages, setMessages] = React.useState<Message[]>([]);

  const [message, setMessage] = React.useState<string | null | undefined>(null);

  let new_messages = [];

  useEffect(() => {

    if (entry && entry !== 'empty') {
        const subscriber = FirebaseService.subscribeForDiaryEntry(entry.id, onSuccess)
        return async () => await subscriber();
    }
    
  }, [entry]);

  const onSuccess = (entry) => {
    console.log('diary')
    new_messages = []
    entry.data()[DIARY.DATABASE.FIELDS.CONVERSATIONS].forEach(item => {
        new_messages.push(new Message(item[DIARY.DATABASE.FIELDS.CONVERSATION.QUESTION].text, '', false));
        new_messages.push(new Message(item[DIARY.DATABASE.FIELDS.CONVERSATION.ANSWER].text, UtilService.getRelativeTime(item[DIARY.DATABASE.FIELDS.CONVERSATION.ANSWER].time), true));
    });

    if(entry.data()[DIARY.DATABASE.FIELDS.STATUS] === DIARY.DATABASE.STATUS.COMPLETE) {
        setReflected(true)
    } else {
        setReflected(false)
        new_messages.push(new Message(DIARY.DATABASE.QUESTIONS.Q4, '', false))
    }

    setMessages(new_messages)

  }

  const sendButtonEnabled = (): boolean => {
    return message && message.length > 0;
  };

  const onSendButtonPress = (): void => {
    //setMessages([...messages, new Message(message, 'now', true)]);
    //setMessage(null);
    //setReflected(true)
    FirebaseService.addReflection(entry.id, {
        [DIARY.DATABASE.FIELDS.CONVERSATION.QUESTION]: { text: DIARY.DATABASE.QUESTIONS.Q4 },
        [DIARY.DATABASE.FIELDS.CONVERSATION.ANSWER]: { text: message, time: FirebaseService.getTimeStamp() }
    })
    Keyboard.dismiss();
  };

  const toggleTooltip = () => {
    setVisible(!visible);
  };

  const setMaxHeightF = (event) => {
    setMaxHeight(event.nativeEvent.layout.height)
  };

  const setMinHeightF = (event) => {
    setMinHeight(event.nativeEvent.layout.height)
  }

  const toggle = () => {
    let initialValue = expanded ? maxHeight + minHeight : minHeight;
    let finalValue = expanded ? minHeight : maxHeight + minHeight;

    setExpanded(!expanded);

    animation.setValue(initialValue);
    Animated.spring(animation, {toValue: finalValue}).start();
  }

  const renderItem = (item) => {
    return (
        <View>
            <Text style={{fontWeight: 'bold', marginTop: 8}}>{item.question}</Text><Text>{item.answer}</Text>
        </View>
    )
  }

  const renderIcon = (style) => (
    <FontAwesomeIcon size={20} color={'green'} icon={faCheckCircle}/>
  );

  if (!entry) {
      return (
        <ActivityIndicator size="large" color="#712177" style={{marginBottom: 20}} />
      )
  }

  if (entry === 'empty') {
    return (
      <Text style={{textAlign: 'center', marginVertical: 10}}>You didn't add an entry for today! 😕</Text>
    )
  }

  return (
    <Layout style={[style, { borderRadius: 5, borderColor: '#DDD', borderWidth: 2, marginHorizontal: 16, marginVertical: 4}]}>
        <Animated.View style={{height: animation, marginBottom: expanded ? 45 : 0}}>
            <View onLayout={setMinHeightF}>
                <TouchableHighlight onPress={toggle} underlayColor="#f1f1f1" style={{borderRadius: 5}}>
                    <View style={[styles.topContainer, expanded ? styles.borderBottom : '']}>
                        <Avatar
                            style={{height: 24, width: 24, marginLeft: 10, marginRight: 10}}
                            source={require('../assets/images/emotivity.png')}
                        />
                        <Text style={styles.headerText} category='h6'>
                            {UtilService.getDateFromDatabaseDateFormat(entry.data()[DIARY.DATABASE.FIELDS.DATE])}
                        </Text>
                        {reflected && <Text style={[styles.headerText, styles.tag, styles.complete]} category='h6'>
                            Complete
                        </Text>}
                        {!reflected && <Text style={[styles.headerText, styles.tag, styles.incomplete]} category='h6'>
                            Incomplete
                        </Text>}
                        <View style={{position: 'absolute', right: 20, top: 11}}>
                            {expanded ? ArrowHeadUpIcon(styles.icon) : ArrowHeadDownIcon(styles.icon)}
                        </View>
                        {/*<Tooltip
                            visible={visible}
                            placement={'top'}
                            text='Positive!'
                            onBackdropPress={toggleTooltip}>
                                <Button onPress={toggleTooltip} icon={renderIcon} appearance='ghost' style={{paddingTop: 5, paddingRight: 0, paddingLeft: 0}}></Button>
                        </Tooltip>
                        */}
                    </View>
                </TouchableHighlight>
            </View>
            <View style={styles.body} onLayout={setMaxHeightF}>
                <View style={expanded ? {} : {display: 'none'}}>
                    <ScrollView>
                        <Chat
                            style={styles.list}
                            contentContainerStyle={styles.listContent}
                            followEnd={true}
                            data={messages}
                        />  
                    </ScrollView>
                </View>
            </View>
        </Animated.View>
        {!reflected && <KeyboardAvoidingView style={styles.messageInputContainer} offset={keyboardOffset}>
            <Input
                style={styles.messageInput}
                placeholder={expanded ? 'Reply...' : 'Thoughts after reflecting?'}
                value={message}
                onChangeText={setMessage}
            />
            <Button
                appearance='outline'
                style={[styles.iconButton, styles.sendButton]}
                icon={PaperPlaneIcon}
                disabled={!sendButtonEnabled()}
                onPress={onSendButtonPress}
            />
        </KeyboardAvoidingView>}
    </Layout>
  );
};

const themedStyles = StyleService.create({
    headerText: {
        fontWeight: '400',
        fontSize: 16,
        textAlignVertical: 'top'
    },
    tag: {
        fontSize: 12, 
        //borderWidth: 1, 
        marginLeft: 10, 
        paddingHorizontal: 6, 
        borderRadius: 5
    },
    complete: {
        borderColor: '#027352', 
        backgroundColor: '#92F0B9', 
    },
    incomplete: {
        borderColor: '#A3223C', 
        backgroundColor: '#F5AEA7', 
    },
    topContainer: {
        padding: 10,
        flexDirection: 'row',
        //justifyContent: 'space-between',
        overflow:'hidden',
    },
    borderBottom: {
        borderBottomColor: '#DDD',
        borderBottomWidth: 1,
    },
    valueLabel: {
        marginTop: 10,
    },
    cardHeader: {
        backgroundColor: 'color-success-100'
    },
    icon: {
        marginTop: 2,
        width: 20,
        height: 20,
    },
    body: {
        minHeight: 120,
    },
    list: {
        flex: 1,
    },
    listContent: {
        paddingVertical: 12
    },
    messageInputContainer: {
        flexDirection: 'row',
        paddingVertical: 8,
        backgroundColor: 'background-basic-color-1',
        borderTopColor: '#DDD',
        borderTopWidth: 1,
        borderRadius: 5,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    },
    messageInput: {
        flex: 1,
        marginHorizontal: 8,
    },
    sendButton: {
        marginRight: 6,
    },
    iconButton: {
        width: 24,
        height: 24,
    }
});
