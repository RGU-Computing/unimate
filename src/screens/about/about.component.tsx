import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { TopNavigation, TopNavigationAction, Layout, Text, Divider, Button } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { ArrowIosBackIcon, InfoIcon } from '../../components/icons';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';

export const AboutScreen = ({ navigation }): React.ReactElement => {

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ArrowIosBackIcon}
      onPress={navigation.goBack}
    />
  );

  const renderSOS = (): React.ReactElement => (
    <TopNavigationAction
      icon={InfoIcon}
      onPress={() => navigation.navigate('Health')}
    />
  );

  return (
    <SafeAreaLayout
      style={styles.container}
      insets='top'>
      <TopNavigation
        title='About Unimate'
        leftControl={renderBackAction()}
        rightControls={[renderSOS()]}
      />
        <Divider/>
        <ScrollView>
        <Layout
        style={styles.header}
        level='1'>
            {/*<Text
                style={styles.titleLabel}
                category='h4'>
                Unimate
            </Text>*/}
            <ImageBackground
                style={styles.image}
                source={require('../../assets/images/cover.png')}
            />
              <Text
                  style={styles.descriptionLabel}
                  category='s1'>
                  Introduction
              </Text>
              <Text style={styles.contentLabel}>
                <Text style={{fontWeight: 'bold'}}>Emotional Self-Awareness</Text> is the ability to understand your emotions and how they affect your behaviour. Being aware of emotional patterns can help you to recognize patterns and change your reactions to stressful events. This ability to monitor and change your emotional reactions is called self-regulation and it is really important for good mental and physical health. This is what we are trying to help you achieve through Unimate. 😊
              </Text>
              <Text style={styles.contentLabel}>
                <Text style={{fontWeight: 'bold'}}>Mood tracking</Text> helps you to monitor and track your mood, or emotions, helping you become more aware of your feelings and the things that cause them. Tracking your mood can help with emotional self-awareness and self-regulation, which can improve mental health and wellbeing.
              </Text>
              <Text style={styles.contentLabel}>
                <Text style={{fontWeight: 'bold'}}>How does the mood tracker work?</Text>
              </Text>
              <Text style={styles.contentLabel}>
                We recommend completing the mood-tracker daily. You will be able to look at your mood over time, helping you to see patterns and make connections between events and emotions, and make positive changes.
              </Text>
              <Text style={styles.contentLabel}>
                <Text style={{fontWeight: 'bold', textAlign: 'center'}}>Important Note: Mood tracking is not a replacement for professional help.</Text>
              </Text>
              <Text style={styles.contentLabel}>
                If you need help with your mental health now please seek advice from the services listed in the info page.
              </Text>
              <Button style={{marginHorizontal: 20, marginBottom: 16}} onPress={() => navigation.navigate('Health')}> Visit Info Page</Button>
              {/*<Layout style={styles.row}>
                <Layout style={{flex: 1}}>
                  <Text style={{fontWeight: 'bold'}}>The Semicolon Effect</Text>
                  <Text>Tel: </Text>
                </Layout>
                <Layout style={{flex: 1}}>
                  <Text style={{fontWeight: 'bold'}}>Helping Hands</Text>
                  <Text>Tel: +94 77 960 5617</Text>
                </Layout>
              </Layout>*/}
              <Divider/>
              <Text
                  style={styles.descriptionLabel}
                  category='s1'>
                  Notifications
              </Text>
              <Text style={styles.contentLabel}>
                <Text style={{fontWeight: 'bold'}}>Mood Tracking Reminders</Text>
              </Text>
              <Text style={styles.contentLabel}>
              We will remind you at about 8PM to track your mood.
              </Text>
              <Text style={styles.contentLabel}>
                <Text style={{fontWeight: 'bold'}}>SayThanx Reminders</Text>
              </Text>
              <Text style={styles.contentLabel}>
              You can use the SayThanx to show your gratitude towards something or someone. We will remind you at about 8PM to say thanks.
              </Text>
              <Text style={styles.contentLabel}>
                <Text style={{fontWeight: 'bold'}}>Step Goal Reminders</Text>
              </Text>
              <Text style={styles.contentLabel}>
                Physical activity is very important for both physical and mental health. Therefore, we will remind you in the morning to keep up with your step goals.
              </Text>
              <Text style={styles.contentLabel}>
                <Text style={{fontWeight: 'bold'}}>Low Mood Scores</Text>
              </Text>
              <Text style={styles.contentLabel}>
                Once you've submitted your mood scores for the day, we will send you in-app notifications based on your negative moods just to help you get through it!
              </Text>
              {/*<Text style={styles.contentLabel}>
                <Text style={{fontWeight: 'bold'}}>Rewards / Achievements</Text>
              </Text>
              <Text style={styles.contentLabel}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc interdum feugiat neque, et suscipit lacus elementum non. Etiam in ipsum.
            </Text>*/}
        </Layout>
        </ScrollView>
    </SafeAreaLayout>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 8,
  },
  titleLabel: {
    marginHorizontal: 24,
    marginVertical: 16,
    textAlign: 'center'
  },
  descriptionLabel: {
    marginHorizontal: 24,
    marginTop: 18,
    marginBottom: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18
  },
  image: {
    marginTop:12,
    marginHorizontal: 12,
    height: 90
  },
  contentLabel: {
    marginHorizontal: 24,
    marginBottom: 12
  },
  contentSub: {
    marginBottom: 12
  },
  row: {
    marginHorizontal: 24,
    marginBottom: 24,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
