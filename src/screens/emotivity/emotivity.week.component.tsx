import {Divider, Text} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {ProgressChart} from 'react-native-chart-kit';
import {ScrollView} from 'react-native-gesture-handler';
import {FirebaseService} from '../../services/firebase.service';
import {DATE, EMOTIVITY} from '../../services/types';
import {UtilService} from '../../services/util.service';

export const EmotivityWeekScreen = ({navigation}): React.ReactElement => {
  let isFirstRingLegend = true;

  const screenWidth = Dimensions.get('window').width;

  const [weeklyDiaryData, setWeeklyDiaryData] = React.useState([]);
  const [weeklyEmotivityData, setWeeklyEmotivityData] = React.useState({
    [EMOTIVITY.DATABASE.FIELDS.ANGER]: 0,
    [EMOTIVITY.DATABASE.FIELDS.ANXIETY]: 0,
    [EMOTIVITY.DATABASE.FIELDS.HAPPINESS]: 0,
    [EMOTIVITY.DATABASE.FIELDS.SADNESS]: 0,
    [EMOTIVITY.DATABASE.FIELDS.STRESS]: 0,
    [EMOTIVITY.DATABASE.FIELDS.TIRED]: 0,
  });

  useEffect(() => {
    FirebaseService.getEmotivityData(
      UtilService.getDateWeekAgo(DATE.FORMATS.DB_UNIX),
      UtilService.getDateYesterday(DATE.FORMATS.DB_UNIX),
      onSuccessMoodTracking,
      onSuccessDiaryEntry,
    );
  }, []);

  const onSuccessMoodTracking = querySnapshot => {
    console.log('emoweek');
    if (querySnapshot.size === 0) {
      console.warn('Emotivity Weekly: 0 results found.');
      setWeeklyEmotivityData('empty');
    } else {
      let count = 0;
      const scores = {
        [EMOTIVITY.DATABASE.FIELDS.ANGER]: 0,
        [EMOTIVITY.DATABASE.FIELDS.ANXIETY]: 0,
        [EMOTIVITY.DATABASE.FIELDS.HAPPINESS]: 0,
        [EMOTIVITY.DATABASE.FIELDS.SADNESS]: 0,
        [EMOTIVITY.DATABASE.FIELDS.STRESS]: 0,
        [EMOTIVITY.DATABASE.FIELDS.TIRED]: 0,
      };

      querySnapshot.forEach(documentSnapshot => {
        count++;
        scores[EMOTIVITY.DATABASE.FIELDS.ANGER] =
          scores[EMOTIVITY.DATABASE.FIELDS.ANGER] +
          parseInt(documentSnapshot.data()[EMOTIVITY.DATABASE.FIELDS.ANGER]);
        scores[EMOTIVITY.DATABASE.FIELDS.ANXIETY] =
          scores[EMOTIVITY.DATABASE.FIELDS.ANXIETY] +
          parseInt(documentSnapshot.data()[EMOTIVITY.DATABASE.FIELDS.ANXIETY]);
        scores[EMOTIVITY.DATABASE.FIELDS.HAPPINESS] =
          scores[EMOTIVITY.DATABASE.FIELDS.HAPPINESS] +
          parseInt(
            documentSnapshot.data()[EMOTIVITY.DATABASE.FIELDS.HAPPINESS],
          );
        scores[EMOTIVITY.DATABASE.FIELDS.SADNESS] =
          scores[EMOTIVITY.DATABASE.FIELDS.SADNESS] +
          parseInt(documentSnapshot.data()[EMOTIVITY.DATABASE.FIELDS.SADNESS]);
        scores[EMOTIVITY.DATABASE.FIELDS.STRESS] =
          scores[EMOTIVITY.DATABASE.FIELDS.STRESS] +
          parseInt(documentSnapshot.data()[EMOTIVITY.DATABASE.FIELDS.STRESS]);
        scores[EMOTIVITY.DATABASE.FIELDS.TIRED] =
          scores[EMOTIVITY.DATABASE.FIELDS.TIRED] +
          parseInt(documentSnapshot.data()[EMOTIVITY.DATABASE.FIELDS.TIRED]);
      });

      scores[EMOTIVITY.DATABASE.FIELDS.ANGER] =
        scores[EMOTIVITY.DATABASE.FIELDS.ANGER] / count;
      scores[EMOTIVITY.DATABASE.FIELDS.ANXIETY] =
        scores[EMOTIVITY.DATABASE.FIELDS.ANXIETY] / count;
      scores[EMOTIVITY.DATABASE.FIELDS.HAPPINESS] =
        scores[EMOTIVITY.DATABASE.FIELDS.HAPPINESS] / count;
      scores[EMOTIVITY.DATABASE.FIELDS.SADNESS] =
        scores[EMOTIVITY.DATABASE.FIELDS.SADNESS] / count;
      scores[EMOTIVITY.DATABASE.FIELDS.STRESS] =
        scores[EMOTIVITY.DATABASE.FIELDS.STRESS] / count;
      scores[EMOTIVITY.DATABASE.FIELDS.TIRED] =
        scores[EMOTIVITY.DATABASE.FIELDS.TIRED] / count;

      setWeeklyEmotivityData(scores);
    }
  };

  const onSuccessDiaryEntry = querySnapshot => {
    console.log('emotoday2');
    const entries: Object[] = [];
    querySnapshot.forEach(documentSnapshot => {
      console.log(documentSnapshot.data());
      entries.push(documentSnapshot);
    });
    setWeeklyDiaryData(entries);
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        alignSelf: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 10,
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 20,
          marginTop: 20,
          textAlign: 'center',
        }}>
        {UtilService.getDateWeekAgo() + ' to ' + UtilService.getDateYesterday()}
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
        Average Mood Summary
      </Text>
      <Divider style={styles.divider} />
      <ProgressChart
        data={{
          labels: [
            'Anger -',
            'Anxiety -',
            'Sadness -',
            'Stress -',
            'Tiredness -',
            'Happy -',
          ],
          data:
            weeklyEmotivityData && weeklyEmotivityData !== 'empty'
              ? [
                  weeklyEmotivityData[EMOTIVITY.DATABASE.FIELDS.ANGER] / 5,
                  weeklyEmotivityData[EMOTIVITY.DATABASE.FIELDS.ANXIETY] / 5,
                  weeklyEmotivityData[EMOTIVITY.DATABASE.FIELDS.SADNESS] / 5,
                  weeklyEmotivityData[EMOTIVITY.DATABASE.FIELDS.STRESS] / 5,
                  weeklyEmotivityData[EMOTIVITY.DATABASE.FIELDS.TIRED] / 5,
                  weeklyEmotivityData[EMOTIVITY.DATABASE.FIELDS.HAPPINESS] / 5,
                ]
              : [0, 0, 0, 0, 0, 0],
        }}
        width={screenWidth}
        height={screenWidth / 1.5}
        chartConfig={{
          backgroundColor: 'white',
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          color: (opacity = 1) => {
            if (
              opacity === 1.2000000000000002 ||
              opacity === 0.9166666666666667
            ) {
              // 6th/Outer Ring - Happiness
              return '#069E73';
            } else if (opacity === 1 || opacity === 0.8333333333333333) {
              //5th Ring - Tired
              return '#D55E00';
            } else if (opacity === 0.8 || opacity === 0.75) {
              //4th Ring - Stress
              return '#E69F03';
            } else if (
              opacity === 0.6000000000000001 ||
              opacity === 0.6666666666666666
            ) {
              // 3rd Ring - Sad
              return '#CC79A7';
            } else if (opacity === 0.4 || opacity === 0.5833333333333334) {
              // 2nd Ring - Anxiety
              if (opacity === 0.5833333333333334) {
                isFirstRingLegend = true;
              }
              return '#57B4E9';
            } else if (opacity === 0.2) {
              // 1st Ring Legend
              if (isFirstRingLegend) {
                isFirstRingLegend = false;
                return '#0172B2';
              } else {
                return 'rgba(113, 33, 119, 0.2)';
              }
            } else if (opacity === 0.5) {
              // 1st Ring - Anger
              return '#0172B2';
            } else {
              return `rgba(113, 33, 119, ${opacity})`;
            }
          },
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          strokeWidth: 1,
        }}
        hideLegend={false}
        style={{
          marginLeft: -20,
        }}
      />
      {/* <Divider style={styles.divider}/>
            <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 16, textAlign: 'center'}}>Diary Entries</Text>
            <View style={{marginBottom: 16}}>
                {weeklyDiaryData.length === 0 && <Text style={{textAlign: 'center', marginHorizontal: 16}}>No diary entries found from the past week! 😕</Text>}
                {weeklyDiaryData.map((entry) => (
                    <DiaryEntry
                        entry={entry}
                    />
                ))}
            </View> */}
    </ScrollView>
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
});
