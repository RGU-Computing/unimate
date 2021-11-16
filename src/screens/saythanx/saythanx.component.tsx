import {TopNavigationAction} from '@ui-kitten/components';
import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {InfoIcon, MenuIcon} from '../../components/icons';
import {SafeAreaLayout} from '../../components/safe-area-layout.component';

const screenHeight = Dimensions.get('window').height;
console.disableYellowBox = true;

export class SaythanxScreen extends React.Component {
  constructor(props) {
    super(props);
    this.setSelectedIndex = this.setSelectedIndex.bind(this);
    this.state = {
      selectedIndex: 0,
    };
  }

  renderDrawerAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={this.props.navigation.toggleDrawer}
    />
  );

  renderSOS = (): React.ReactElement => (
    <TopNavigationAction
      icon={InfoIcon}
      onPress={() => this.props.navigation.navigate('Saythanx')}
    />
  );

  setSelectedIndex(index) {
    this.setState({selectedIndex: index});
  }

  render() {
    return <SafeAreaLayout style={styles.safeArea} insets="top" />;
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  tabContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    height: '100%',
  },
  active_title: {
    color: '#712177',
    fontWeight: 'bold',
  },
  inactive_title: {
    fontWeight: 'bold',
  },
  bar: {
    height: 40,
  },
  tabView: {},
  tabViewIndicator: {
    backgroundColor: '#712177',
    borderRadius: 0,
  },
  container: {
    paddingHorizontal: 18,
    paddingTop: 18,
    //flex: 1,
    //flexDirection: 'row',
    //alignItems: 'center',
    //justifyContent: 'center',
    marginBottom: screenHeight / 3.8,
  },
  item: {
    marginTop: 15,
  },
  tit: {
    fontWeight: 'bold',
  },
  desc: {
    marginBottom: 10,
  },
});
