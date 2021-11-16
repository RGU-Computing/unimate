import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Image, Dimensions, ImageBackground, Alert } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import { Text } from '@ui-kitten/components';
import Config from 'react-native-config';

export default class LoginScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  async onGoogleButtonPress() {
    this.setState({ isLoading: true })
    await GoogleSignin.configure({
      scopes: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        //"https://www.googleapis.com/auth/fitness.location.read",
        //"https://www.googleapis.com/auth/fitness.activity.read",
        //"https://www.googleapis.com/auth/fitness.body.read"
      ],
      webClientId: Config.WEB_CLIENT_ID
    })
    try {
      const { idToken } = await GoogleSignin.signIn()
      const googleCredential = auth.GoogleAuthProvider.credential(idToken)
      const firebaseUserCredential = await auth().signInWithCredential(googleCredential);
      if (firebaseUserCredential.user._auth._authResult) {
        console.log(firebaseUserCredential.user)
        //this.props.navigation.navigate('Home')
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        this.setState({ isLoading: false })
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Oops! An error has occurred.', 'Login Already in Progress!', [
          { text: 'OK' }
        ]);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Oops! An error has occurred.', 'Google Play Services is not Available.', [
          { text: 'OK' }
        ]);
      } else {
        Alert.alert('Oops! An error has occurred.', error + "", [
          { text: 'OK' }
        ]);
      }
    }

  }

  async componentDidMount() {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      this.props.navigation.navigate('Home')
    } else {
      this.setState({ isLoading: false })
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size='large' color="#712177" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {/*<TopNavigation
              title='Emotivity'
              //leftControl={this.renderDrawerAction()}
            />
            <Divider/>
            <Image
            style={{
                alignSelf: "center",
                resizeMode: "cover",
                marginVertical: 5,
                width: deviceWidth/3,
                height: deviceWidth/3,
            }}
            source={{uri: 'asset:/ic_launcher.png'}}
          />*/}
        <Text category='h5'>👋 Welcome Aboard!</Text>
        <Image
          style={styles.image}
          source={require('../../assets/images/cover.png')}
        />
        <Text style={{ textAlign: 'center', marginHorizontal: 24 }}>Unimate is an app to support mental & physical wellbeing in students.</Text>
        <Text style={{ textAlign: 'center', marginHorizontal: 24, marginTop: 24 }}>Sign In to Continue!</Text>
        <GoogleSigninButton
          style={styles.button}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={() => this.onGoogleButtonPress()} />
        <Text style={styles.copyright} appearance='hint'>© 2020-2021 Robert Gordon University</Text>
        <Text style={styles.copyright} appearance='hint'>Aberdeen, United Kingdom.</Text>
        <Text style={styles.copyright} appearance='hint'>www.unimate.app</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginHorizontal: 24
  },
  image: {
    margin: 24,
    width: 300,
    height: 80
  },
  button: {
    marginTop: 12,
    marginBottom: 24
  },
  copyright: {
  }
})