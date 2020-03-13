import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider, TopNavigation, TopNavigationAction, Text, Layout } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { MenuIcon } from '../../components/icons';
import { MoodSelector } from '../../components/mood-selector';
import AppIntroSlider from 'react-native-app-intro-slider';
import icons from '../../components/helpers/icons'
import MotionSlider from 'react-native-motion-slider';

const moods = [
  {
    key: 'anger',
    title: 'Anger',
    text: 'How angry are you today?',
    image: require('../../assets/images/angry.png'),
    type: 'negative'
  },
  {
    key: 'happiness',
    title: 'Happy',
    text: 'How happy are you today?',
    image: require('../../assets/images/happy.png'),
    type: 'positive'
  }
];

export class EmotivityScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      anger: 0,
      anxiety: 0,
      happiness: 0,
      sadness: 0,
      stress: 0,
    }
    this.handleChangeAnger = this.handleChangeAnger.bind(this);
    this.handleChangeAnxiety = this.handleChangeAnxiety.bind(this)
    this.handleChangeHappiness = this.handleChangeHappiness.bind(this)
    this.handleChangeSadness = this.handleChangeSadness.bind(this)
    this.handleChangeStress = this.handleChangeStress.bind(this)
  }

  renderDrawerAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={this.props.navigation.toggleDrawer}
    />
  );

  handleChangeAnger(index) {
    this.setState({ anger: index })
  }

  handleChangeAnxiety(index) {
    this.setState({ anxiety: index })
  }

  handleChangeHappiness(index) {
    this.setState({ happiness: index })
  }

  handleChangeSadness(index) {
    this.setState({ sadness: index })
  }

  handleChangeStress(index) {
    this.setState({ stress: index })
  }

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  };

  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  };

  _renderItem = ({ item }) => {
    return (
      <View style={item.type === 'positive' ? styles.pos_slide : styles.neg_slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Image style={styles.icon} source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
        <MotionSlider
          min={0}
          max={100}
          value={50}
          decimalPlaces={0}
          backgroundColor={item.type === 'positive' ? ['#D12B3F', '#D36913', '#1A9B1E'] : ['#1A9B1E', '#D36913', '#D12B3F']}
          onValueChanged={(value) => console.log(value)}
          onPressIn={() => console.log('Pressed in')}
          onPressOut={() => console.log('Pressed out')}
          onDrag={() => console.log('Dragging')}
        />
        <Text style={styles.hint}>( on a scale of 0 to 100 )</Text>
        <Layout style={styles.margin}></Layout>
      </View>
    );
  }
  
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  }

  render() {
    return (
      <SafeAreaLayout
        style={styles.safeArea}
        insets='top'>
        <TopNavigation
          title='Emotivity'
          leftControl={this.renderDrawerAction()}
        />
        <Divider/>
        {/*<ScrollView>
          <Text category={'h5'} style={styles.title}>How are you feeling today?</Text>
          <MoodSelector 
            title='Happiness'
            group='facebook' 
            reactions={['like', 'love', 'haha', 'wow', 'sad']}
            onChange={this.handleChangeHappiness}
            value={this.state.happiness}
            style={styles.slider}
          />
          <MoodSelector 
            title='Anger'
            group='facebook' 
            reactions={['like', 'love', 'haha', 'wow', 'sad']}
            onChange={this.handleChangeAnger}
            value={this.state.anger}
            style={styles.slider}
          />
          <MoodSelector 
            title='Anxiety'
            group='facebook' 
            reactions={['like', 'love', 'haha', 'wow', 'sad']}
            onChange={this.handleChangeAnxiety}
            value={this.state.anxiety}
            style={styles.slider}
          />
          <MoodSelector 
            title='Sadness'
            group='facebook' 
            reactions={['like', 'love', 'haha', 'wow', 'sad']}
            onChange={this.handleChangeSadness}
            value={this.state.sadness}
            style={styles.slider}
          />
          <MoodSelector 
            title='Stress'
            group='facebook' 
            reactions={['like', 'love', 'haha', 'wow', 'sad']}
            onChange={this.handleChangeStress}
            value={this.state.stress}
            style={styles.slider}
          />
        </ScrollView>*/}
        <AppIntroSlider
            slides={moods}
            renderItem={this._renderItem}
        />
      </SafeAreaLayout>
    );
  }
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    paddingVertical: 75
  },
  slider: {
    marginHorizontal: 10,
    marginVertical: 5
  },
  neg_slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E35B5F'
  },
  pos_slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#50C349'
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingBottom: 32,
    paddingTop: 16,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
  hint: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingTop: 16,
    fontWeight: 'bold'
  },
  margin: {
    height: '15%'
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});