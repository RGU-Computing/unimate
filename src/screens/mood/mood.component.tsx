import React, { useEffect } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View,SafeAreaView, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider, TopNavigation, TopNavigationAction, Icon, Text, Input, ListItem } from '@ui-kitten/components';
import { ActionCard } from '../../components/action-card.component';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { MenuIcon, InfoIcon, PrivacyLockIcon, TraxivityAvatar, EmotivityAvatar } from '../../components/icons';
import { FirebaseService } from '../../services/firebase.service';
import { UtilService } from '../../services/util.service';
import { AppStorage } from '../../services/app-storage.service';
import {TodoInput} from "../../components/todo-input.component";
import  {TodoItem}  from '../../components/todo-item.component';
import AsyncStorage from '@react-native-community/async-storage';
import { text } from '@fortawesome/fontawesome-svg-core';
export const MoodScreen = ({ navigation }): React.ReactElement => {

  const [actionData, setActionData] = React.useState<Object>();
  const [todoItems, setTodoItems] = React.useState([]);

  const userGreeting = UtilService.getUserGreeting();

  //let actionData = {}

  useEffect(() => {
    FirebaseService.getTodayActionCard(onSuccess);
    setInitialToDoList()

  }, []);

  const setInitialToDoList = async () => {
    const initialToDoList = await AppStorage.getToDoList();
    if(initialToDoList != null){
      setTodoItems(initialToDoList)
    }
  }


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

  const addTodoItem = async (_text) => {
    // setTodoItems([...todoItems, {text:_text, completed: false}]);
    //  console.log(_text)
    // console.log('Saving todo  list on client end')

    // AppStorage.saveToDoList(todoItems)
    // console.log('Vihanga Start')
//const temp = await AsyncStorage.getItem('todo_key');
    // console.log(temp)
    const temp = await AppStorage.getToDoList()
    // setTodoItems([...temp, {text:_text, completed: false}])
    if(temp != null){
      temp.push({text:_text, completed: false})
      await AppStorage.saveToDoList(temp)
      setTodoItems(temp)  
    }
    else{
      const tempIni = [{text:_text, completed: false}]
      await AppStorage.saveToDoList(tempIni)
      setTodoItems(tempIni)  
    }
  };

const deleteTodoItem = async (_index) => {
  const temp = await AppStorage.getToDoList()
  let tempArr = [...temp];
  tempArr.splice(_index, 1);
  await AppStorage.saveToDoList(tempArr)
  setTodoItems(tempArr)
};

const completeTodoItem = async (_index) => {
  const temp = await AppStorage.getToDoList()
  let tempArr = [...temp];
  tempArr[_index].completed = !tempArr[_index].completed;
  await AppStorage.saveToDoList(tempArr)
  setTodoItems(tempArr)

}

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
        <Text style={{textAlign: 'center', marginTop: 8, marginBottom:2, fontWeight: 'bold'}} > Today, in My Tasks</Text>

    <StatusBar barStyle={"light-content"} backgroundColor={"#212121"}/>
    <View style={{height:150, marginHorizontal: 16, justifyContent: 'space-between', flex: 1, borderRadius: 5, borderColor: '#DDD', borderWidth: 1}}>
    <ScrollView>
    <SafeAreaView style={{ marginHorizontal: 8, marginVertical:8, justifyContent: 'space-between', flex: 1}}>
    <FlatList
    data={todoItems}
    // data={AppStorage.getToDoList()}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({item, index}) => {
    return (
    <TodoItem
    item={item}
    deleteFunction={() => deleteTodoItem(index)}
    completeFunction={() => completeTodoItem(index)}
    />
    )
    }}
    />
        </SafeAreaView>
        </ScrollView>
</View>
        <SafeAreaView style={{padding: 16, justifyContent: 'space-between', flex: 1}}>

    <TodoInput onPress={addTodoItem} />
    <Text style={[{marginHorizontal: 16, fontSize: 12}]}>🔒 Your data will be stored only in your device</Text>
    </SafeAreaView>

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