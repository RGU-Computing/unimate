import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {Divider, Select, Text} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {LineChart, ProgressChart} from 'react-native-chart-kit';
import {ScrollView} from 'react-native-gesture-handler';
import {FirebaseService} from '../../services/firebase.service';
import {DATE, EMOTIVITY} from '../../services/types';
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
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2,
      label: 'Anger',
    },
    {
      data: [],
      color: (opacity = 1) => `rgba(114, 65, 244, ${opacity})`, // optional
      strokeWidth: 2,
      label: 'Anxiety',
    },
    {
      data: [],
      color: (opacity = 1) => `rgba(94, 65, 244, ${opacity})`, // optional
      strokeWidth: 2,
      label: 'Happiness',
    },
    {
      data: [],
      color: (opacity = 1) => `rgba(74, 65, 244, ${opacity})`, // optional
      strokeWidth: 2,
      label: 'Sadness',
    },
    {
      data: [],
      color: (opacity = 1) => `rgba(54, 65, 244, ${opacity})`, // optional
      strokeWidth: 2,
      label: 'Stress',
    },
    {
      data: [],
      color: (opacity = 1) => `rgba(34, 65, 244, ${opacity})`, // optional
      strokeWidth: 2,
      label: 'Tired',
    },
  ],
  legend: ['Emotian Progreess of the week'],
};

export const EmotivityWeekScreen = ({navigation}): React.ReactElement => {
  let isFirstRingLegend = true;

  const screenWidth = Dimensions.get('window').width;

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
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    labelColor: (opacity = 1) => {
      `rgba(0, 0, 0, ${opacity})`;
    },
  };

  const [lineChartData, setLineChartData] = useState<{
    labels: string[];
    datasets: any;
    legend: string[];
  } | null>(null);
  const [selectedOption, setSelectedOption] = useState<any>({text: 'Anger'});

  const [weeklyDiaryData, setWeeklyDiaryData] = React.useState([]);
  const [weeklyEmotivityData, setWeeklyEmotivityData] = React.useState({
    anger: 0,
    anxiety: 0,
    happiness: 0,
    sadness: 0,
    stress: 0,
    tired: 0,
  });

  const [filteredData, setFilteredData] = useState<null | any>(null);

  const onSuccessMoodTracking = (
    querySnapshot: FirebaseFirestoreTypes.QuerySnapshot,
  ) => {
    console.log(`emoweek ${JSON.stringify(querySnapshot.empty)}`);
    if (querySnapshot.size === 0) {
      console.warn('Emotivity Weekly: 0 results found.');
      setWeeklyEmotivityData('empty');
    } else {
      let count = 0;
      const scores = {
        anger: 0,
        anxiety: 0,
        happiness: 0,
        sadness: 0,
        stress: 0,
        tired: 0,
      };

      const tempLineChartData = initialLineChartData;

      querySnapshot.forEach(documentSnapshot => {
        count++;

        const data = documentSnapshot.data();

        console.log({data});
        tempLineChartData.labels.push(
          UtilService.getDateString(data.date as number),
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

      setLineChartData(tempLineChartData);
      setWeeklyEmotivityData(scores);
      console.log({tempLineChartData});
    }
  };

  useEffect(() => {
    FirebaseService.getEmotivityData(
      UtilService.getDateWeekAgo(DATE.FORMATS.DB_UNIX),
      UtilService.getDateYesterday(DATE.FORMATS.DB_UNIX),
      onSuccessMoodTracking,
      onSuccessDiaryEntry,
    );
  }, []);

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
    <ScrollView style={styles.scrollView}>
      <Text style={styles.emotivityDateText}>
        {UtilService.getDateWeekAgo() + ' to ' + UtilService.getDateYesterday()}
      </Text>
      <Divider style={styles.dateDivider} />
      <Text style={styles.moodSummeryText}>Average Mood Summary</Text>
      <Divider style={styles.divider} />
      <ProgressChart
        style={styles.progressChart}
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
              return '#D55E00';
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
      />
      <Divider style={styles.divider} />
      {lineChartData && (
        <Select
          data={lineChartData.datasets.map(dataset => ({text: dataset.label}))}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  divider: {
    width: '50%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    height: 1,
    marginVertical: 16,
    borderRadius: 5,
  },
  moodSummeryText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  emotivityDateText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  dateDivider: {
    width: '100%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  progressChart: {
    marginLeft: -20,
  },
});
