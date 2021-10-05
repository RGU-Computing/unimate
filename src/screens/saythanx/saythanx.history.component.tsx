import React, { useEffect } from 'react';
import { Text, Divider, RangeCalendar, Button, Layout } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, Dimensions, View, ActivityIndicator, FlatList } from 'react-native';
import { UtilService } from '../../services/util.service';
import { FirebaseService } from '../../services/firebase.service';
import { DATE, EMOTIVITY } from '../../services/types';
import { ProgressChart } from 'react-native-chart-kit';
import { DiaryEntry } from '../../components/diary-entry.component';
import {AppStorage} from '../../services/app-storage.service';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SaythanxItem } from './saythanx.item.component';

export const SaythanxHistoryScreen = ({ navigation }): React.ReactElement => {

  const [sayThanksList, setSayThanksList] = React.useState([]);

    useEffect(() => {
      setInitialSayThanksList()
      const unsubscribe = navigation.addListener('focus', () => {
        // The screen is focused
        console.log("Inside History Tab")
        setInitialSayThanksList()
      });
  
      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
    }, []);
 
    
    const setInitialSayThanksList = async () => {
      const initialSayThanksList = await AppStorage.getSayThanksList();
      console.log("Intial say thanks start")
      console.log(initialSayThanksList)
      console.log("initial say thanks list end")
      if(initialSayThanksList != null){
          setSayThanksList(initialSayThanksList)
      }
    }

  return (
    <Layout style={{height: '100%'}} >
    <ScrollView style={{flex: 1, width:'90%', alignSelf: 'center', backgroundColor: 'white'}}>
 {/* <ScrollView>
     <SafeAreaView style={{ marginHorizontal: 8, marginVertical:8, justifyContent: 'space-between', flex: 1}}> */}
     <FlatList
     data={sayThanksList}
     style={{marginTop:'5%'}}
     // data={AppStorage.getToDoList()}
     keyExtractor={(item, index) => index.toString()}
     renderItem={({item, index}) => {
     return (
     <SaythanxItem
     item={item}
     />
     )
     }}
     />
         {/* </SafeAreaView> */}
{/* //          </ScrollView> */}
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
        borderRadius: 5
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

function props(props: any) {
  throw new Error('Function not implemented.');
}
