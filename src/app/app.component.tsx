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
    title: 'Unimate',
    text: 'Unimate is a research study, aimed at \nenhancing students’ educational\n experience and wellbeing.',
    image: require('../assets/images/slides/logo.png'),
    backgroundColor: '#FFFFFF', //#712177
  },
  {
    key: 2,
    title: 'What Unimate Does',
    text: 'Unimate can help you to be aware and \ntake control of your mental \nand physical health.',
    image: require('../assets/images/slides/happiness.png'),
    backgroundColor: '#FFFFFF',
  },
  {
    key: 3,
    title: 'Your Privacy Matters',
    text: 'Don\'t worry! All your details are \nanonymised. Even we, won\'t be able to \ntrace them back to you!',
    image: require('../assets/images/slides/privacy-shield.png'),
    backgroundColor: '#FFFFFF',
  },
  {
    key: 4,
    title: 'Emotivity',
    text: 'We want to help you take control of\n your health by monitoring and \nchanging your emotional and physical\n reactions.',
    image: require('../assets/images/slides/reaction.png'),
    backgroundColor: '#FFFFFF',
  },
  {
    key: 5,
    title: 'Daily Tasks',
    text: 'Keep up with your daily tasks and they \nwill definitely help you when it comes \nto enhancing your mental health.',
    image: require('../assets/images/slides/todo.png'),
    backgroundColor: '#FFFFFF',
  },
  {
    key: 6,
    title: 'SayThanx &\n ShowGratitude',
    text: 'We can help you to be happier by \nletting you be thankful, everyday! \nYou can also keep track of what you are \ngrateful to and reflect on them at your own pace!',
    image: require('../assets/images/slides/thanks.png'),
    backgroundColor: '#FFFFFF',
  },
  {
    key: 7,
    title: 'Traxivity',
    text: 'Lift up your mood by keeping up with \nyour workout goals.',
    image: require('../assets/images/slides/steps.png'),
    backgroundColor: '#FFFFFF',
  },
  {
    key: 8,
    title: 'Start!',
    text: 'Let’s Start!',
    image: require('../assets/images/slides/start.png'),
    backgroundColor: '#FFFFFF',
  }
];

const _renderItem = ({ item }) => {
  return (
    <View style={{backgroundColor: item.backgroundColor, alignItems: 'center',justifyContent: 'center', height: '100%'}}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
      <View style={styles.margin}></View>
    </View>
  );
}

const _renderNextButton = () => {
  return (
    <View style={styles.buttonNext}>
      <Text style={styles.buttonNextText}>Next</Text>
    </View>
  );
};
const _renderDoneButton = () => {
  return (
    <View style={styles.buttonDone}>
      <Text style={styles.buttonDoneText}>Done</Text>
    </View>
  );
};
const _renderPrevButton = () => {
  return (
    <View style={styles.buttonPrev}>
      <Text  style={styles.buttonPrevText}>Back</Text>
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
        renderDoneButton={_renderDoneButton}
        renderNextButton={_renderNextButton}
        renderPrevButton={_renderPrevButton}
        showPrevButton={true}
        activeDotStyle={{backgroundColor: '#712177'}	}
        // dotStyle={{backgroundColor: '#F8D4EE'}}
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
    height: '35%',
    marginVertical: '6%',
    resizeMode: 'contain',
    // padding: '30%'
  },
  text: {
    color: '#7D7C7C',
    textAlign: 'center',
    fontSize: 18,
    //fontWeight: 'bold',
    paddingTop: 30,
    marginBottom: '24%',
    marginHorizontal: 20,
  },
  title: {
    paddingTop: 24,
    fontSize: 30,
    color: 'black',
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
  },
  buttonNextText:{
    color: '#712177'
  },
  buttonNext:{
    marginRight: '8%',
  },
  buttonDoneText:{
    color: '#712177',
  },
  buttonDone:{
    marginRight: '8%',
  },
  buttonPrev:{
    marginLeft: '25%',
  },
  buttonPrevText:{
    color: '#7F8283'
  }
});