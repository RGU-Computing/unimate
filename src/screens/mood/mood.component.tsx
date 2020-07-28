import React, { useEffect } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider, TopNavigation, TopNavigationAction, Icon, Text, Input, ListItem } from '@ui-kitten/components';
import { ActionCard } from '../../components/action-card.component';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { MenuIcon, InfoIcon, TraxivityAvatar, EmotivityAvatar } from '../../components/icons';
import { FirebaseService } from '../../services/firebase.service';
import { UtilService } from '../../services/util.service';
import { AppStorage } from '../../services/app-storage.service';

export const MoodScreen = ({ navigation }): React.ReactElement => {

  const [actionData, setActionData] = React.useState<Object>();

  const userGreeting = UtilService.getUserGreeting();
  
  //let actionData = {}

  useEffect(() => {
    FirebaseService.getTodayActionCard(onSuccess);
  }, []);

  const onSuccess = (querySnapshot) => {
    console.log('mood')
    if (querySnapshot.size === 0) {
      console.warn('Found 0 action cards for today.');
      setActionData('empty')
    } else if (querySnapshot.size > 1) {
      console.warn('Found over 1 action cards for today.');
      querySnapshot.forEach(documentSnapshot => {
        setActionData(documentSnapshot)
      });
    } else {
      querySnapshot.forEach(documentSnapshot => {
        setActionData(documentSnapshot)
      });
    }
  }

  const renderDrawerAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={navigation.toggleDrawer}
    />
  );

  const renderSOS = (): React.ReactElement => (
    <TopNavigationAction
      icon={InfoIcon}
      onPress={() => navigation.navigate('Health')}
    />
  );

  /*toggleSecureEntry = () => {
    this.setState({disabled: !this.state.disabled})
  };*/

  const focusIcon = (props) => (
    <TouchableWithoutFeedback /*onPress={this.toggleSecureEntry}*/>
      {/*<Icon {...props} name={this.state.disabled ? 'edit-2-outline' : 'bookmark-outline'}/>*/}
      <Icon {...props} name={'bookmark-outline'}/>
    </TouchableWithoutFeedback>
  );

  const statusE = (props) => (
    <Text status={AppStorage.getEmotivityDetails().status ? 'success' : 'danger'}>{AppStorage.getEmotivityDetails().status ? 'Tracked' : 'Not Tracked'}</Text>
  );

  const statusT = (props) => (
    <Text status={AppStorage.getTraxivityDetails().goal > AppStorage.getTraxivityDetails().steps ? 'danger' : 'success'}>{AppStorage.getTraxivityDetails().steps}/{AppStorage.getTraxivityDetails().goal}</Text>
  );

  return (
    <SafeAreaLayout
      style={styles.safeArea}
      insets='top'>
      <TopNavigation
        title='Unimate'
        leftControl={renderDrawerAction()}
        rightControls={[renderSOS()]}
      />
      <Divider/>
      {/*<ImageBackground
            style={styles.image}
            source={require('../../assets/images/cover.png')}
      />*/}
      <ScrollView style={{backgroundColor: 'white'}}>
        <Text style={{textAlign: 'center', marginTop: 8, fontWeight: 'bold', fontSize: 20}} category={'h5'}>{userGreeting}</Text>
        <Input
          //value={this.state.label}
          placeholder='What is your main focus today?'
          icon={focusIcon}
          //disabled={this.state.disabled}
          //onChangeText={value => this.setState({label: value})}
          style={{marginHorizontal: 16, alignSelf: "center", marginTop: 8, backgroundColor: 'white'}}
          textStyle={{textAlign: "left", fontSize: 14}}
          size={'large'}
        />
        <Text style={{textAlign: 'center', fontWeight: 'bold', marginBottom: 16, marginTop: 12}}> Your Progress Today </Text>
        <ListItem
          title='Emotivity: Mood Tracking'
          //description='Mood Tracking & Diary'
          icon={EmotivityAvatar}
          accessory={statusE}
          onPress={() => navigation.navigate('Emotivity')}
          style={{marginHorizontal: 16, borderRadius: 5, marginBottom: 6, borderColor: '#DDD', borderWidth: 1}}
        />
        <ListItem
          title='Traxivity: Step Goal'
          //description='A set of React Native components'
          icon={TraxivityAvatar}
          accessory={statusT}
          onPress={() => navigation.navigate('Traxivity')}
          style={{marginHorizontal: 16, borderRadius: 5, marginBottom: 6, borderColor: '#DDD', borderWidth: 1}}
        />
        <Divider style={styles.divider}/>
        <ActionCard
          data={actionData}
          style={styles.actionCard}
        />
      </ScrollView>
      {/*<Button style={styles.button} status='danger'>SOS</Button>*/}
    </SafeAreaLayout>
  )
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  actionCard: {
    marginHorizontal: 16,
    marginTop: 2
  },
  slider: {
    marginHorizontal: 20
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 50,
    position: 'absolute',                                          
    bottom: 20,                                                    
    right: 20,
    //backgroundColor: '#712177',
    //borderColor: '#712177'
  },
  divider: {
    width: '25%',
    backgroundColor: '#ddd',
    alignSelf: 'center',
    height: 1,
    marginVertical: 8,
    borderRadius: 5
  }
});