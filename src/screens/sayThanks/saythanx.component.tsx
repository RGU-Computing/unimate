import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/core';
import {
  Divider,
  Icon,
  Input,
  List,
  ListItem,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {InfoIcon, MenuIcon, SearchIcon} from '../../components/icons';
import {User} from '../../models/auth/user';
import {AppStorage} from '../../services/app-storage.service';
import {FirebaseService} from '../../services/firebase.service';
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
      {/* <Divider/> */}
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
