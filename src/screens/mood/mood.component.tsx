import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Divider,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { ActionCard } from '../../components/action-card.component';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { MenuIcon } from '../../components/icons';
import { Action } from '../../models/action';

const data = new Action(
  '13th February 2020', 
  'Here goes the text of the action card.',
);

export class MoodScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      anger: 0,
      anxiety: 0,
      happiness: 0,
      sadness: 0,
      stress: 0,
    }
  }

  renderDrawerAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={this.props.navigation.toggleDrawer}
    />
  );

  render() {
    return (
      <SafeAreaLayout
        style={styles.safeArea}
        insets='top'>
        <TopNavigation
          title='UniMate'
          leftControl={this.renderDrawerAction()}
        />
        <Divider/>
        <ActionCard
          greeting='Good Morning Janith!'
          action={data}
          style={styles.actionCard}
        />
      </SafeAreaLayout>
    );
  }
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  actionCard: {
    margin: 16
  },
  title: {
    textAlign: 'center',
    marginVertical: 20
  },
  slider: {
    marginHorizontal: 20
  },
});