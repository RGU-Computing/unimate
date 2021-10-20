import React, {useEffect} from 'react';
import {StyleSheet, Dimensions, View, Image, FlatList} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ProgressChart} from 'react-native-chart-kit';
import AppIntroSlider from 'react-native-app-intro-slider';
import MotionSlider from 'react-native-motion-slider';
import {
  Text,
  Divider,
  Modal,
  Layout,
  Input,
  Button,
} from '@ui-kitten/components';
import {UtilService} from '../../services/util.service';
import {DiaryEntry} from '../../components/diary-entry.component';
import {DIARY, MOOD_SLIDES, EMOTIVITY, DATE} from '../../services/types';
import {FirebaseService} from '../../services/firebase.service';
import {
  ArrowIosForwardIcon,
  ArrowIosBackIcon,
  CheckIcon,
} from '../../components/icons';
import {AppStorage} from '../../services/app-storage.service';
import {SaythanxItem} from './saythanx.item.component';
import {color} from 'react-native-reanimated';

// const useInputState = (initialValue = '') => {
//     const [value, setValue] = React.useState(initialValue);
//     return { value, onChangeText: setValue };
//   };

export const SaythanxTodayScreen = ({navigation}): React.ReactElement => {
  // const thanksInput = useInputState();
  const [sayThanksList, setSayThanksList] = React.useState([]);
  const [thanksInput, setThanksInput] = React.useState<string>('');

  const addSayThanks = async () => {
    const temp = await AppStorage.getSayThanksList();
    if (temp != null && temp.length > 0) {
      const userInput = [{text: thanksInput, date: UtilService.getDateToday()}];
      const updatedArr = userInput.concat(temp);
      await AppStorage.saveSayThanksList(updatedArr);
    } else {
      const tempIni = [{text: thanksInput, date: UtilService.getDateToday()}];
      await AppStorage.saveSayThanksList(tempIni);
    }
    setThanksInput('');
    setSayThanksListFromLocalStorage()
    //Mark emotivity Completed for today
    AppStorage.markSayThanxTodayCompleted({date: UtilService.getDateTodayNoFormat(), action: 'Completed'})
  };

  //   useEffect(() => {
  //     setSayThanksListFromLocalStorage()

  //   }, []);
  useEffect(() => {
    setSayThanksListFromLocalStorage();
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      setSayThanksListFromLocalStorage();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  const setSayThanksListFromLocalStorage = async () => {
    const initialSayThanksList = await AppStorage.getSayThanksList();
    if (initialSayThanksList != null) {
      setSayThanksList(initialSayThanksList);
    }
  };

  return (
    <Layout style={{height: '100%'}}>
      <ScrollView
        style={{
          flex: 1,
          alignSelf: 'center',
          backgroundColor: 'white',
          // paddingHorizontal: 10,
          width: '90%',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            marginTop: 20,
            textAlign: 'center',
          }}>
          {UtilService.getDateToday()}
        </Text>
        <Divider
          style={{width: '100%', alignSelf: 'center', marginVertical: 10}}
        />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            marginTop: 10,
            textAlign: 'center',
          }}>
          SayThanx
        </Text>
        <Divider style={styles.divider} />
        <Input
          multiline={true}
          placeholder="Today I'm grateful for ..."
          // {...thanksInput}
          onChangeText={text => setThanksInput(text)}
          value={thanksInput}
          style={{alignSelf: 'center', backgroundColor: 'white'}}
          textStyle={{
            textAlign: 'left',
            fontSize: 14,
            minHeight: 100,
            minWidth: '90%',
          }}
          //   size={'large'}
        />
        <Button
          // appearance='outline'
          // style={[styles.iconButton, styles.sendButton]}
          // icon={PaperPlaneIcon}
          // disabled={!sendButtonEnabled()}
          onPress={addSayThanks}
          disabled={thanksInput.length==0}>
          Say Thank You
        </Button>
        { (sayThanksList.filter(e => e.date === UtilService.getDateToday()).length > 0)
         && (
          <Text
            style={{
              marginTop: '10%',
              color: '#6D237A',
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            Today
          </Text>
        )}
        {(sayThanksList.filter(e => e.date === UtilService.getDateToday()).length > 0) && (
          <FlatList
            data={sayThanksList}
            style={{marginTop: '5%'}}
            // data={AppStorage.getToDoList()}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              if (item.date == UtilService.getDateToday()) {
                return <SaythanxItem item={item} />;
              }
            }}
          />
        )}
        { (sayThanksList.filter(e => e.date === UtilService.getDateToday()).length == 0) &&
         <Text
         style={{
           marginTop: '10%',
           textAlign: 'center'
         }}
         appearance='hint'>
         🎉 You haven't say about {"\n"}
         how you are grateful today! ✨
       </Text>
        }
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  divider: {
    width: '50%',
    backgroundColor: '#ddd',
    alignSelf: 'center',
    height: 1,
    marginVertical: 16,
    borderRadius: 5,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    padding: 16,
    borderRadius: 5,
  },
  input: {
    marginTop: 8,
  },
  inputText: {
    paddingTop: 2,
    textAlignVertical: 'top',
  },
  label: {
    color: 'black',
    fontSize: 14,
  },
  buttonFull: {
    width: '100%',
    marginTop: 16,
    marginHorizontal: 5,
  },
  buttonHalf: {
    width: '48%',
    marginTop: 16,
    marginHorizontal: 5,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#712177',
  },
  title: {
    fontSize: 24,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingTop: 16,
    marginBottom: 16,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingBottom: 24,
    paddingTop: 16,
    fontWeight: 'bold',
    fontSize: 16,
  },
  icon: {
    width: '30%',
    height: '30%',
    resizeMode: 'contain',
    paddingVertical: '15%',
  },
  hint: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    paddingTop: 12,
    fontWeight: 'bold',
    width: '50%',
  },
  margin: {
    height: '10%',
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
