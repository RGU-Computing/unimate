import React from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import {
  Avatar,
  Button,
  Divider,
  Drawer,
  DrawerElement,
  DrawerHeaderElement,
  DrawerHeaderFooter,
  DrawerHeaderFooterElement,
  Layout,
  MenuItemType,
  Text,
  Card, 
  Modal
} from '@ui-kitten/components';
import { AboutIcon, GlobeIcon } from '../../components/icons';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { WebBrowserService } from '../../services/web-browser.service';
import { AppInfoService } from '../../services/app-info.service';
import { AppStorage } from '../../services/app-storage.service';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { UtilService } from '../../services/util.service';
import RNRestart from 'react-native-restart';

const DATA: MenuItemType[] = [
  { title: 'About Unimate', icon: AboutIcon },
  { title: 'Visit Unimate Website', icon: GlobeIcon },
  { title: 'Robert Gordon University Website', icon: GlobeIcon },
];

const version: string = AppInfoService.getVersion();

export const BaseDrawer = ({ navigation }): DrawerElement => {

  const onItemSelect = (index: number): void => {
    switch (index) {
      case 0: {
        navigation.toggleDrawer();
        navigation.navigate('About');
        return;
      }
      case 1: {
        WebBrowserService.openBrowserAsync('https://unimate.app/');
        navigation.toggleDrawer();
        return;
      }
      case 2: {
        WebBrowserService.openBrowserAsync('http://www.comp.rgu.ac.uk/');
        navigation.toggleDrawer();
        return;
      }
    }
  };

  const userSignOut = async () => {
    // AsyncStorage.getAllKeys((err, keys) => {
    //   AsyncStorage.multiGet(keys, (error, stores) => {
    //     stores.map((result, i, store) => {
    //       console.log({ [store[i][0]]: store[i][1] });
    //       return true;
    //     });
    //   });
    // });
    try {
      await GoogleSignin.configure({
        scopes: [
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/userinfo.email",
          //"https://www.googleapis.com/auth/fitness.location.read",
          //"https://www.googleapis.com/auth/fitness.activity.read",
          //"https://www.googleapis.com/auth/fitness.body.read"
        ],
        webClientId: '[Web Client ID]'
      })
      
      // console.log(await GoogleSignin.isSignedIn())
  
      await auth().signOut().then(function() {
        console.log('Signed Out');
      }, function(error) {
        console.error('Sign Out Error', error);
      });
            await GoogleSignin.signOut();

    } 
    catch (error) {
      console.log('Rejected');
      console.log(error)
    }

//  console.log(await GoogleSignin.isSignedIn())
  
    AsyncStorage.getAllKeys().then((keyArray) => {
      AsyncStorage.multiGet(keyArray).then((keyValArray) => {
        let myStorage: any = {};
        for (let keyVal of keyValArray) {
          myStorage[keyVal[0]] = keyVal[1]
        }
  
        console.log('CURRENT STORAGE: ', myStorage);
      })
    });
    // await auth().signOut();
    // AppStorage.setUser({});
    // AsyncStorage.clear();
  };

  const eraseDataLogout = async () => {

    await AsyncStorage.getAllKeys()
        .then(keys => {
          AsyncStorage.multiRemove(keys)})
        .then(() => console.log("All local data Removed"));

    await userSignOut();
    setVisible(false);
    RNRestart.Restart();
  }
  
  const keepDataLogout = async () => {
    await userSignOut();

    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map(async (result, i, store) => {
          // get at each store's key/value so you can work with it
          let key = store[i][0];
          let value = store[i][1];
          console.log(key)
          console.log(value)
          if(!(key==="todo_key" || key==="saythanks_key" || key==="notifications_key" || key==="saythanx_today_filled" || key==="hasLaunched")){
            await AsyncStorage.removeItem(key);
          }
        });
      });
    });   

    setVisible(false);
    RNRestart.Restart();
  }


  const [visible, setVisible] = React.useState(false);


  const renderHeader = (): DrawerHeaderElement => (
    <Layout
      style={styles.header}
      level='2'>
      <View style={styles.profileContainer}>
        <Avatar
          size='giant'
          source={{ uri: AppStorage.getUser().photoURL }}
          style={{borderRadius: 5}}
        />
        <Text
          style={styles.profileName}
          category='h6'>
          {AppStorage.getUser().displayName}
        </Text>
      </View>
    </Layout>
  );

  const renderFooter = (): DrawerHeaderFooterElement => (
    <React.Fragment>
      <Button
      appearance='ghost'
      onPress={() => setVisible(true)}>
        Sign Out
        </Button>
      <Divider/>
      <DrawerHeaderFooter
        disabled={true}
        description={'Copyright © 2020-2021 Robert Gordon University'}
      />
    </React.Fragment>
  );

  return (
    <SafeAreaLayout
      style={styles.safeArea}
      insets='top'>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true}>
          <Text style={styles.signoutHeader}>Sign out</Text>
          <Text style={{marginBottom:5}}>Are you sure you would like to log out?</Text>
          <Button style={{margin:1}}
          appearance='outline'
          status='danger'
      onPress={eraseDataLogout}>
        Remove data and log out
        </Button>
        <Button
        appearance='outline'
        status='primary'
        style={{margin:1}}
      onPress={keepDataLogout}>
        Keep data and log out
        </Button>
        </Card>
      </Modal>


      <Drawer
        header={renderHeader}
        footer={renderFooter}
        data={DATA}
        onSelect={onItemSelect}
      />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    height: 128,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor:'#712177',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    marginHorizontal: 16,
    color:'#FFFFFF',
    flexShrink: 1,
  },
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  signoutHeader: {
    fontWeight: 'bold',
    textAlign:'center',
    fontSize:16
  }
});
