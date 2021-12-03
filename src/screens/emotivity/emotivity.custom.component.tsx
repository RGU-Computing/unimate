import {
  Button,
  Divider,
  RangeCalendar,
  Select,
  Text,
} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {LineChart, ProgressChart} from 'react-native-chart-kit';
import {ScrollView} from 'react-native-gesture-handler';
import {FirebaseService} from '../../services/firebase.service';
import {EMOTIVITY} from '../../services/types';
import {UtilService} from '../../services/util.service';

const initialLineChartData: {
  labels: string[];
  datasets: any;
  legend: string[];
} = {
  labels: [],
  datasets: [
    {
      data: [],
      color: (opacity = 1) => `rgba(1, 114, 178, ${opacity})`, // optional
      strokeWidth: 2,
      label: 'Anger',
    },
    {
      data: [],
      color: (opacity = 1) => `rgba(87, 180, 233, ${opacity})`, // optional
      strokeWidth: 2,
      label: 'Anxiety',
    },
    {
      data: [],
      color: (opacity = 1) => `rgba(6, 158, 115, ${opacity})`, // optional
      strokeWidth: 2,
      label: 'Happiness',
    },
    {
      data: [],
      color: (opacity = 1) => `rgba(204, 121, 167, ${opacity})`, // optional
      strokeWidth: 2,
      label: 'Sadness',
    },
    {
      data: [],
      color: (opacity = 1) => `rgba(230, 159, 3, ${opacity})`, // optional
      strokeWidth: 2,
      label: 'Stress',
    },
    {
      data: [],
      color: (opacity = 1) => `rgba(213, 94, 0, ${opacity})`, // optional
      strokeWidth: 2,
      label: 'Tired',
    },
  ],
  legend: ['Emotional Progreess of the week'],
};

export const EmotivityCustomScreen = ({navigation}): React.ReactElement => {
  let isFirstRingLegend = true;

  const screenWidth = Dimensions.get('window').width;

  const [range, setRange] = React.useState({
    startDate: null,
    endDate: null,
  });

  const lineChartConfig = {
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#0000',
    },
    backgroundGradientFrom: 'white',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: 'white',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    labelColor: (opacity = 1) => {
      `rgba(0, 0, 0, ${opacity})`;
    },
  };

  const [weeklyDiaryData, setWeeklyDiaryData] = React.useState([]);
  const [weeklyEmotivityData, setWeeklyEmotivityData] = React.useState({
    [EMOTIVITY.DATABASE.FIELDS.ANGER]: 0,
    [EMOTIVITY.DATABASE.FIELDS.ANXIETY]: 0,
    [EMOTIVITY.DATABASE.FIELDS.HAPPINESS]: 0,
    [EMOTIVITY.DATABASE.FIELDS.SADNESS]: 0,
    [EMOTIVITY.DATABASE.FIELDS.STRESS]: 0,
    [EMOTIVITY.DATABASE.FIELDS.TIRED]: 0,
  });

  const [lineChartData, setLineChartData] = useState<{
    labels: string[];
    datasets: any;
    legend: string[];
  } | null>(null);
  const [selectedOption, setSelectedOption] = useState<any>({text: 'Anger'});

  const [filteredData, setFilteredData] = useState<null | any>(null);

  useEffect(() => {
    if (range.endDate) {
      FirebaseService.getEmotivityData(
        range.startDate.getTime(),
        range.endDate.getTime(),
        onSuccessMoodTracking,
        onSuccessDiaryEntry,
      );
    }
  }, [range]);

  const onSuccessMoodTracking = querySnapshot => {
    console.log('emocus');
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

      const tempLineChartData = initialLineChartData;

      querySnapshot.forEach(documentSnapshot => {
        count++;

        const data = documentSnapshot.data();

        tempLineChartData.labels.push(
          UtilService.getDateFromDatabaseDateFormat(data.date),
        );

        scores[EMOTIVITY.DATABASE.FIELDS.ANGER] =
          scores[EMOTIVITY.DATABASE.FIELDS.ANGER] +
          parseInt(data[EMOTIVITY.DATABASE.FIELDS.ANGER], 10);
        scores[EMOTIVITY.DATABASE.FIELDS.ANXIETY] =
          scores[EMOTIVITY.DATABASE.FIELDS.ANXIETY] +
          parseInt(data[EMOTIVITY.DATABASE.FIELDS.ANXIETY], 10);
        scores[EMOTIVITY.DATABASE.FIELDS.HAPPINESS] =
          scores[EMOTIVITY.DATABASE.FIELDS.HAPPINESS] +
          parseInt(data[EMOTIVITY.DATABASE.FIELDS.HAPPINESS], 10);
        scores[EMOTIVITY.DATABASE.FIELDS.SADNESS] =
          scores[EMOTIVITY.DATABASE.FIELDS.SADNESS] +
          parseInt(data[EMOTIVITY.DATABASE.FIELDS.SADNESS], 10);
        scores[EMOTIVITY.DATABASE.FIELDS.STRESS] =
          scores[EMOTIVITY.DATABASE.FIELDS.STRESS] +
          parseInt(data[EMOTIVITY.DATABASE.FIELDS.STRESS], 10);
        scores[EMOTIVITY.DATABASE.FIELDS.TIRED] =
          scores[EMOTIVITY.DATABASE.FIELDS.TIRED] +
          parseInt(data[EMOTIVITY.DATABASE.FIELDS.TIRED], 10);

        tempLineChartData.datasets[0].data.push(parseInt(data.anger, 10));
        tempLineChartData.datasets[1].data.push(parseInt(data.anxiety, 10));
        tempLineChartData.datasets[2].data.push(parseInt(data.happiness, 10));
        tempLineChartData.datasets[3].data.push(parseInt(data.sadness, 10));
        tempLineChartData.datasets[4].data.push(parseInt(data.stress, 10));
        tempLineChartData.datasets[5].data.push(parseInt(data.tired, 10));
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
      setLineChartData(tempLineChartData);
    }
  };

  const onSuccessDiaryEntry = querySnapshot => {
    console.log('emocus2');
    const entries: Object[] = [];
    querySnapshot.forEach(documentSnapshot => {
      console.log(documentSnapshot.data());
      entries.push(documentSnapshot);
    });
    setWeeklyDiaryData(entries);
  };

  useEffect(() => {
    if (lineChartData) {
      const filteredDataSet = lineChartData.datasets.filter(
        dataset => dataset.label === selectedOption.text,
      );
      const lineChartProcessedData = {
        ...lineChartData,
        datasets: filteredDataSet,
      };
      setFilteredData(lineChartProcessedData);
      console.log({lineChartData});
    }
  }, [lineChartData, selectedOption]);

  return (
    <ScrollView
      style={{
        flex: 1,
        alignSelf: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 10,
      }}>
      {!range.endDate && (
        <>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              marginVertical: 20,
              textAlign: 'center',
            }}>
            Select the Date Range
          </Text>
          <RangeCalendar
            range={range}
            onSelect={setRange}
            style={{marginBottom: 20}}
          />
        </>
      )}
      {range.endDate && (
        <>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: 20,
              textAlign: 'center',
            }}>
            {UtilService.getDateFromDatabaseDateFormat(range.startDate)} to{' '}
            {UtilService.getDateFromDatabaseDateFormat(range.endDate)}
          </Text>
          <Button
            style={{marginHorizontal: '20%', marginTop: 10}}
            onPress={() => setRange({startDate: null, endDate: null})}>
            Reset Date Range
          </Button>
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
                      weeklyEmotivityData[EMOTIVITY.DATABASE.FIELDS.ANXIETY] /
                        5,
                      weeklyEmotivityData[EMOTIVITY.DATABASE.FIELDS.SADNESS] /
                        5,
                      weeklyEmotivityData[EMOTIVITY.DATABASE.FIELDS.STRESS] / 5,
                      weeklyEmotivityData[EMOTIVITY.DATABASE.FIELDS.TIRED] / 5,
                      weeklyEmotivityData[EMOTIVITY.DATABASE.FIELDS.HAPPINESS] /
                        5,
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
          <Divider style={styles.divider} />
          {lineChartData && (
            <Select
              data={lineChartData.datasets.map(dataset => ({
                text: dataset.label,
              }))}
              selectedOption={selectedOption}
              onSelect={setSelectedOption}
            />
          )}
          {filteredData && selectedOption && (
            <>
              <LineChart
                data={filteredData}
                width={screenWidth}
                height={256}
                verticalLabelRotation={30}
                chartConfig={lineChartConfig}
                bezier={true}
              />
            </>
          )}
          {/* <Divider style={styles.divider}/>
            <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 16, textAlign: 'center'}}>Diary Entries</Text>
            {weeklyDiaryData.length === 0 && <View style={[styles.container, styles.horizontal]}><ActivityIndicator size="large" color="#712177" /></View>}
            {weeklyDiaryData === 'empty' && <Text style={{textAlign: 'center', marginHorizontal: 20}}>No entries found from "{UtilService.getDateFromDatabaseDateFormat(range.startDate)}" to "{UtilService.getDateFromDatabaseDateFormat(range.endDate)}" 😕</Text>}
            <View style={{marginBottom: 16}}>
                {weeklyDiaryData.map((entry) => (
                    <DiaryEntry
                        entry={entry}
                    />
                ))}
            </View> */}
        </>
      )}
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
