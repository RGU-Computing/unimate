import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { AppearanceProvider } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppIntroSlider from 'react-native-app-intro-slider';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppLoading, LoadFontsTask, Task } from './app-loading.component';
import { appMappings, appThemes } from './app-theming';
import { AppIconsPack } from './app-icons-pack';
import { StatusBar } from '../components/status-bar.component';
import { SplashImage } from '../components/splash-image.component';
import { AppNavigator } from '../navigation/app.navigator';
import { AppStorage } from '../services/app-storage.service';
import { Mapping, Theme, Theming } from '../services/theme.service';
import LoginScreen from '../screens/login/login.component';
import { FirebaseService } from '../services/firebase.service';
import { default as appTheme } from './app-theme.json';

const loadingTasks: Task[] = [];

const defaultConfig: { mapping: Mapping, theme: Theme } = {
  mapping: 'eva',
  theme: 'light',
};

const screens = [
  {
    key: 1,
    title: 'Welcome!',
    text: 'Unimate is a research study, aimed at enhancing students’ educational experience and wellbeing.',
    image: require('../assets/images/slides/1.png'),
    backgroundColor: '#712177',
  },
  {
    key: 2,
    title: 'What Unimate Does',
    text: 'Unimate can help you to be aware and take control of your mental and physical health.',
    image: require('../assets/images/slides/2.png'),
    backgroundColor: '#712177',
  },
  {
    key: 3,
    title: 'Your Privacy',
    text: 'Don\'t worry! All your details are anonymised. Even we, won\'t be able to trace them back to you!',
    image: require('../assets/images/slides/privacy.png'),
    backgroundColor: '#712177',
  },
  {
    key: 4,
    title: 'Self-Regulation',
    text: 'We want to help you take control of your health by monitoring and changing your emotional and physical reactions.',
    image: require('../assets/images/slides/3.png'),
    backgroundColor: '#712177',
  },
  {
    key: 5,
    title: 'Daily Tasks',
    text: 'Keep up with your daily tasks and they will definitely help you when it comes to enhancing your mental health.',
    image: require('../assets/images/slides/4.png'),
    backgroundColor: '#712177',
  },
  {
    key: 6,
    title: 'Mood Tracking',
    text: 'Keep track of the daily variations of all \nyour positive and negative moods.',
    image: require('../assets/images/slides/5.png'),
    backgroundColor: '#712177',
  },
  {
    key: 7,
    title: 'SayThanx',
    text: 'We can help you to be happier by letting you be thankful, everyday!',
    image: require('../assets/images/slides/6.png'),
    backgroundColor: '#712177',
  },
  {
    key: 8,
    title: 'ShowGratitude',
    text: 'You can also keep track of what you are grateful to and reflect on them at your own pace!',
    image: require('../assets/images/slides/7.png'),
    backgroundColor: '#712177',
  },
  {
    key: 9,
    title: 'Step Goals',
    text: 'Lift up your mood by \nkeeping up with your workout goals.',
    image: require('../assets/images//slides/8.png'),
    backgroundColor: '#712177',
  }
];

const _renderItem = ({ item }) => {
  return (
    <View style={{backgroundColor: item.backgroundColor, alignItems: 'center',justifyContent: 'center', height: '100%'}}>
      <Text style={styles.title}>{item.title}</Text>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.text}>{item.text}</Text>
      <View style={styles.margin}></View>
    </View>
  );
}

const App = ({ mapping, theme }): React.ReactElement => {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [isEmotivityDone, setEmotivityDone] = useState<boolean>(false);
  const [isTraxivityDone, setTraxivityDone] = useState<boolean>(false);
  const [isFirst, setIsFirst] = useState(null);

  const [mappingContext, currentMapping] = Theming.useMapping(appMappings, mapping);
  const [themeContext, currentTheme] = Theming.useTheming(appThemes, mapping, theme);

  const finalTheme = { ...currentTheme, ...appTheme }

  const _onDone = () => {
    AppStorage.setLaunched();
    setIsFirst(false);
  }

  const hasLaunchedBefore = async () =>  {
    const temp = await AppStorage.hasLaunched();
    setIsFirst(!temp);
  }

  const checkPushPermissions = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      getToken();
    } else {
      requestPermission();
    }
  }

  const getToken = async () => {
    const token = await messaging().getToken()
    FirebaseService.setPushToken(token);
  }

  const requestPermission = async () => {
    try {
      await messaging().requestPermission();
      getToken();
    } catch (error) {
      console.log('Rejected');
    }
  }

  const createNotificationListeners = async() => {
    
    // If your app is in Foreground
    notificationListener = firebase.notifications().onNotification((notification) => {
        const localNotification = new firebase.notifications.Notification({
          show_in_foreground: true,
        })
        .setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        .setBody(notification.body)

        firebase.notifications()
          .displayNotification(localNotification)
          .catch(err => console.error(err));
    });


    //If your app is in background
    notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      console.log('onNotificationOpened:');
      Alert.alert(title, body)
    });


    // If your app is closed

    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      console.log('getInitialNotification:');
    }

    // For data only payload in foreground

    messaging().onMessage((message) => {
      //process data message
      console.log("Message", JSON.stringify(message));
    });
  }

  useEffect(() => {
    hasLaunchedBefore();
    let subscriberEmotivity
    let subscriberTraxivity

    createNotificationListeners();

    const subscriberAuth = auth().onAuthStateChanged(user => {
      if (user) {
        const user_data = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        }
        FirebaseService.setUser(user_data);
        AppStorage.setUser(user_data);
        setUser(user_data);
        checkPushPermissions();
        if (initializing) setInitializing(false);
        //FirebaseService.getIsEmotivityDoneToday(onSuccess);
        //FirebaseService.getTraxivitySummaryToday();
        subscriberEmotivity = FirebaseService.subscribeForEmotivity(onSuccess);
        subscriberTraxivity = FirebaseService.subscribeForTraxivity(onSuccessTrax);
      }
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    const foreground = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return async () => {
      subscriberAuth();
      await subscriberEmotivity && subscriberEmotivity();
      await subscriberTraxivity && subscriberTraxivity();
      await foreground;
    }
  }, []);
  
  const onSuccess = (querySnapshot) => {
    if (querySnapshot.size === 0) {
      console.warn('Found 0 emotivity records for today.');
      AppStorage.setEmotivityDetails(false);
      setEmotivityDone(false);
    } else if (querySnapshot.size > 1) {
      // TODO
      console.warn('Found over 1 emotivity records for today.');
      querySnapshot.forEach(documentSnapshot => {
        AppStorage.setEmotivityDetails(true, documentSnapshot);
        setEmotivityDone(true);
      });
    } else {
      querySnapshot.forEach(documentSnapshot => {
        AppStorage.setEmotivityDetails(true, documentSnapshot);
        setEmotivityDone(true);
      });
    }
  }

  const onSuccessTrax = (documentSnapshot) => {
    if (documentSnapshot.data()) {
      FirebaseService.getStepsToday(documentSnapshot.data().dailyStepGoal, () =>  setTraxivityDone(true));
    } else {
      FirebaseService.getStepsToday(5000, () =>  setTraxivityDone(true));
    }
    
  }

  if (isFirst === null) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#712177" />
      </View>
    )
  }

  if (isFirst) {
    return (
      <AppIntroSlider
        slides={screens}
        renderItem={_renderItem}
        showPrevButton={true}
        onDone={_onDone}
      />
    )
  }
  
  if (!user) {
    return (
      <React.Fragment>
        <IconRegistry icons={[EvaIconsPack, AppIconsPack]}/>
        {/*initializing &&
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#712177" />
        </View>
        */}
        
        <AppearanceProvider>
          <ApplicationProvider {...currentMapping} theme={finalTheme}>
            <Theming.MappingContext.Provider value={mappingContext}>
              <Theming.ThemeContext.Provider value={themeContext}>
                <SafeAreaProvider>
                  <StatusBar/>
                  <View>
                    <LoginScreen/>
                  </View>
                </SafeAreaProvider>
              </Theming.ThemeContext.Provider>
            </Theming.MappingContext.Provider>
          </ApplicationProvider>
        </AppearanceProvider>
        
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <IconRegistry icons={[EvaIconsPack, AppIconsPack]}/>
      {initializing &&
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#712177" />
      </View>
      }
      {!initializing &&
      <AppearanceProvider>
        <ApplicationProvider {...currentMapping} theme={finalTheme}>
          <Theming.MappingContext.Provider value={mappingContext}>
            <Theming.ThemeContext.Provider value={themeContext}>
              <SafeAreaProvider>
                <StatusBar/>
                <AppNavigator/>
              </SafeAreaProvider>
            </Theming.ThemeContext.Provider>
          </Theming.MappingContext.Provider>
        </ApplicationProvider>
      </AppearanceProvider>
      }
    </React.Fragment>
  );

};

const Splash = ({ loading }): React.ReactElement => (
  <SplashImage
    loading={loading}
    source={require('../assets/images/image-splash.png')}
  />
);

export default (): React.ReactElement => (
  <AppLoading
    tasks={loadingTasks}
    initialConfig={defaultConfig}
    placeholder={Splash}>
    {props => <App {...props}/>}
  </AppLoading>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  image: {
    //width: '88%',
    height: '60%',
    marginVertical: '6%',
    resizeMode: 'contain'
  },
  text: {
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'center',
    fontSize: 16,
    //fontWeight: 'bold',
    marginBottom: '24%',
    marginHorizontal: 20,
  },
  title: {
    paddingTop: 24,
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  },
  margin: {
    //height: '15%'
  },
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});