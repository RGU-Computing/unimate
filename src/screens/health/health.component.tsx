import React from 'react';
import { StyleSheet } from 'react-native';
import {
  TopNavigation,
  TopNavigationAction,
  Divider,
} from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { MenuIcon } from '../../components/icons';
import Articles from '../../components/articles.component';

export class HealthScreen extends React.Component {

  constructor(props) {
    super(props);
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
          title='Health'
          leftControl={this.renderDrawerAction()}
        />
        <Divider/>
        <Articles navigation={this.props.navigation}/>
      </SafeAreaLayout>
    );
  }

};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  }
});