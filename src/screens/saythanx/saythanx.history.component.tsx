import React, {useEffect} from 'react';
import {
  Text,
  Divider,
  RangeCalendar,
  Button,
  Layout,
  Avatar,
} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';
import {
  StyleSheet,
  Dimensions,
  View,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import {UtilService} from '../../services/util.service';
import {FirebaseService} from '../../services/firebase.service';
import {DATE, EMOTIVITY} from '../../services/types';
import {ProgressChart} from 'react-native-chart-kit';
import {DiaryEntry} from '../../components/diary-entry.component';
import {AppStorage} from '../../services/app-storage.service';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SaythanxItem} from './saythanx.item.component';

export const SaythanxHistoryScreen = ({navigation}): React.ReactElement => {
  const [sayThanksList, setSayThanksList] = React.useState([]);

  useEffect(() => {
    setInitialSayThanksList();
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      console.log('Inside History Tab');
      setInitialSayThanksList();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  const setInitialSayThanksList = async () => {
    const initialSayThanksList = await AppStorage.getSayThanksList();
    console.log('Intial say thanks start');
    console.log(initialSayThanksList);
    console.log('initial say thanks list end');
    if (initialSayThanksList != null) {
      setSayThanksList(initialSayThanksList);
    }
  };

  return (
    <Layout style={{height: '100%'}}>
      <ScrollView
        style={{
          flex: 1,
          width: '90%',
          alignSelf: 'center',
          backgroundColor: 'white',
        }}>
        {sayThanksList.filter(e => e.date != UtilService.getDateToday()).length > 0 && (
          <FlatList
            data={sayThanksList}
            style={{marginTop: '5%'}}
            // data={AppStorage.getToDoList()}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              if (item.date != UtilService.getDateToday()) {
                return <SaythanxItem item={item} />;
              }
            }}
          />
        )}
        {sayThanksList.filter(e => e.date != UtilService.getDateToday()).length == 0 &&
        <View style={{marginVertical:'50%'}}>
        <Avatar
          style={{height: 100, width: 100, alignSelf: 'center', borderRadius:0}}
          source={require('../../assets/images/searchDocuments.png')}
        />
         <Text
                  style={{
                    marginTop: '10%',
                    textAlign: 'center',
                    // fontWeight: 'bold',
                    fontSize: 20,
                  }}
                  appearance='hint'>
          You have no past
          </Text>
          <Text
                  style={{
                    marginTop: '1%',
                    textAlign: 'center',
                    // fontWeight: 'bold',
                    fontSize: 20,
                    paddingTop:'1%'
                  }}
                  appearance='hint'>
          entries at this moment! 😕
        </Text>
        </View>
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
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

function props(props: any) {
  throw new Error('Function not implemented.');
}
