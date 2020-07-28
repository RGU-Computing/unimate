import React, { useEffect } from 'react';
import { Text, Divider, RangeCalendar, Layout } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, Dimensions, View, Alert } from 'react-native';
import { UtilService } from '../../services/util.service';
import { FirebaseService } from '../../services/firebase.service';
import { DATE, EMOTIVITY } from '../../services/types';
import { ProgressChart, BarChart } from 'react-native-chart-kit';
import { DiaryEntry } from '../../components/diary-entry.component';
import { GoogleSignin } from '@react-native-community/google-signin';
import { AppStorage } from '../../services/app-storage.service';
import TraxivityDataTab from '../../components/traxivity-data.component';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import * as Progress from 'react-native-progress';
import { getSteps, getCals, getDists } from '../../api/googleFitApi'

export const TraxivityTodayScreen = ({ navigation }): React.ReactElement => {
    
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height

    const tab: Object[] = [];
    
    const [user] = React.useState<Object>(AppStorage.getUser());
    const [goal, setGoal] = React.useState<number>(0);
    const [steps, setSteps] = React.useState<number>(0);
    const [cals, setCals] = React.useState<number>(0);
    const [dists, setDists] = React.useState<number>(0);

    const useForceUpdate = () => React.useState()[1];

    useEffect(() => {
        const options = {
            scopes: [
                Scopes.FITNESS_ACTIVITY_READ_WRITE,
                //Scopes.FITNESS_BODY_READ_WRITE,
                //Scopes.FITNESS_LOCATION_READ_WRITE
            ],
        }
        
        GoogleFit.authorize(options).then(res => {
            console.log('res')
            console.log(res)
            _getData()
        }).catch(err => console.log(err));

        GoogleSignin.getCurrentUser().then(user => {
            console.log('usr')
            console.log(user)
            this.setState({user})
        }).catch(err => console.log(err));
      
          /*this.props.navigation.addListener('didFocus', () => {
            const ref = firestore().collection('users').doc(this.state.user.user.id);
            
            firestore().runTransaction(async transaction => {
              const doc = await transaction.get(ref);
      
              if(!doc.exists) {
                transaction.set(ref, {user: this.state.user.user, dailyStepGoal: 5000})
              } else {
                this.setState({goal: doc._data.dailyStepGoal})
              }
            })
          })*/
      
        GoogleFit.isAvailable((err, res) => {
            if(err || !res) {
              Alert.alert('Download Google Fit', 'No data available for this account, please download Google Fit', [
                {text: 'OK', style: 'cancel'}
              ])
            }
        })
    }, []);

    async function _getData () {
        var start = new Date();
        var end = new Date();
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
    
        const options = {
          startDate: start,
          endDate: end
        };
    
        getSteps (options, null, res => {
            //this.setState({steps: [{value: 493}]})
            setSteps(res.length > 0 ? res[0].value : 0);
            //this.setState({ steps: res.length > 0 ? res[0].value : 0})
        });
    
        getCals({...options, basalCalculation: false}, res => {
            setCals(res ? res[0].calorie : 0);
            //this.setState({ cals: res ? res[0].calorie : 0 })
        });
    
        getDists(options, res => {
            setDists(res ? res[0].distance : 0);
            //this.setState({ dists: res ? res[0].distance : 0})
        });
    
        for(let i = 0; i < 24; i++) {
            start.setHours(i, 0, 0, 0);
            end.setHours(i, 59, 59, 999);
            var optionsTab = {
                startDate: start,
                endDate: end
            };
            getSteps(optionsTab, i, (res, index) => {
                tab[index] = res.length > 0 ? res[0] : {date: "", value: 0}
                if(index == 23) {
                    useForceUpdate();
                    console.log('forceupdate?')
                    //forceUpdate()
                }
            })
        }
    }

    const progress = steps > goal ? 100 : Math.round((steps*100)/goal)
    const BoxData = {
      numBox1: goal,
      textBox1: "Daily Goal",
      numBox2: steps,
      textBox2: "Steps Today",  
      numBox3: cals,
      textBox3: "Kcal burned",
      numBox4: dists/1000,
      textBox4: "Kilometers"
    }

    const formatter: string[] = [];
    for (let i = 0; i < 24; i++) {
      formatter.push(i.toString());
    }

    if (progress) {
        return (
            <Layout style={styles.tabContainer}>
                <ScrollView style={{flex: 1, alignSelf: 'center', backgroundColor: 'white', paddingHorizontal: 10}}>
                    <View style={{alignItems: 'center', margin: 10}}>
                        <Progress.Circle 
                            size={screenWidth/1.6} 
                            progress={progress/100}
                            color='#712177'
                            thickness={10}
                            showsText={true}
                        />
                    </View>
                    <View style={{height: screenHeight/1.5, marginBottom: 180}}>
                        <TraxivityDataTab data={BoxData}/>
                        <BarChart tabStep={tab} formatter={formatter} granularity={4} chartConfig={{color: (opacity = 1) => `rgba(113, 33, 119, ${opacity})`}}/>
                    </View>
                </ScrollView>
            </Layout>
        );
    } else {
        return <></>
    }

};

const styles = StyleSheet.create({
    tabContainer: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        height: '100%',
    }
});