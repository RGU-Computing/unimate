import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/core';
import {
  Button,
  Divider,
  Icon,
  Input,
  List,
  ListItem,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {User} from '../../models/auth/user';
import {AppStorage} from '../../services/app-storage.service';
import {FirebaseService} from '../../services/firebase.service';
import React, {FC, useEffect, useState, useCallback, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {InfoIcon, MenuIcon, SearchIcon} from '../../components/icons';
/**
 * - User search
 * - Old Chats
 *
 */
interface SayThanksScreenProps {
  // props
}

export const SayThanksScreen: FC<SayThanksScreenProps> = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[] | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const searchRef = useRef<any>();

  const nav = useNavigation();
  const [chats, setChats] = useState<any[]>([]);

  const onGettingUsers = useCallback(
    async (documents: FirebaseFirestoreTypes.QuerySnapshot) => {
      if (documents.empty || !currentUser) {
        return;
      }

      const userDocs = documents.docs
        .map(doc => doc.data())
        .map((value: any) => {
          if (value.user.uid === currentUser.uid) {
            value.user.displayName = 'Me';
          }
          return value.user;
        })
        .map(doc => doc as User);

      setUsers(userDocs);
    },
    [currentUser],
  );

  useEffect(() => {
    (async () => {
      const user = await AppStorage.getUser();
      setCurrentUser(user);
      await FirebaseService.getAllUsers(onGettingUsers);
    })();
  }, [onGettingUsers]);

  useEffect(() => {
    if (!searchRef.current.isFocused() || !users || users.length === 0) {
      return;
    }

    if (searchText === '') {
      setFilteredUsers(users);
      return;
    }

    const filteredList = users.filter(
      user =>
        user.displayName.includes(searchText) ||
        user.email.includes(searchText),
    );
    setFilteredUsers(filteredList);
  }, [searchText, users]);

  const renderItemIcon = props => <Icon {...props} name="person" />;

  const renderItem = (props: {item: User; index: number}) => (
    <ListItem
      title={props.item.displayName}
      description={props.item.email}
      icon={renderItemIcon}
      onPress={() => nav.navigate('Chat', {userId: props.item.uid})}
    />
  );

  const renderSOS = (): React.ReactElement => (
    <TopNavigationAction
      icon={InfoIcon}
      onPress={() => nav.navigate('Health')}
    />
  );
  useEffect(() => {
    FirebaseService.getReceivedChats().then(res => {
      console.log('res', {res});

      setChats(Object.keys(res));
      console.log('keys', Object.keys(res));
    });
  }, []);

  const renderDrawerAction = (): React.ReactElement => (
    <TopNavigationAction icon={MenuIcon} onPress={(nav as any).toggleDrawer} />
  );

  return (
    <>
      <TopNavigation
        title="SayThanx"
        leftControl={renderDrawerAction()}
        rightControls={[renderSOS()]}
        titleStyle={{color: 'white'}}
        style={{backgroundColor: '#712177'}}
      />
      <View style={styles.bar}>
        <View style={styles.container}>
          <Input
            style={{height: 40, fontSize: 14}}
            placeholder="Search text"
            icon={SearchIcon}
            value={searchText}
            onChange={nextValue => setSearchText(nextValue.nativeEvent.text)}
            ref={searchRef}
          />
          <Divider />
          <List data={filteredUsers} renderItem={renderItem} />
          <Text>Say Thank</Text>
          <Button
            onPress={() => {
              nav.navigate('Chat');
            }}>
            Go to Chat
          </Button>

          {chats &&
            chats.map(chat => (
              <TouchableOpacity
                onPress={() => {
                  nav.navigate('Chat', {chatUID: chat});
                }}>
                <Text>{chat}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  indicator: {
    borderRadius: 0,
  },
  bar: {
    flex: 1,
    backgroundColor: '#712177',
    paddingBottom: 0,
    paddingTop: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
  },
});
