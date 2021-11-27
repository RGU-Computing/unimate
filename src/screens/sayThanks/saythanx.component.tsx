import {useNavigation} from '@react-navigation/core';
import {
  Button,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {InfoIcon, MenuIcon} from '../../components/icons';
interface SayThanksScreenProps {
  // props
}

export const SayThanksScreen: FC<SayThanksScreenProps> = () => {
  const nav = useNavigation();

  const renderSOS = (): React.ReactElement => (
    <TopNavigationAction
      icon={InfoIcon}
      onPress={() => nav.navigate('Health')}
    />
  );

  const renderDrawerAction = (): React.ReactElement => (
    <TopNavigationAction icon={MenuIcon} onPress={(nav as any).toggleDrawer} />
  );

  return (
    <>
      <TopNavigation
        title="SayThanx"
        leftControl={renderDrawerAction()}
        rightControls={[renderSOS()]}
        titleStyle={{color: 'white'}}
        style={{backgroundColor: '#712177'}}
      />
      {/* <Divider/> */}
      <View style={styles.bar}>
        <View style={styles.container}>
          <Text>Say Thank</Text>
          <Button
            onPress={() => {
              nav.navigate('Chat');
            }}>
            Go to Chat
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  indicator: {
    borderRadius: 0,
  },
  bar: {
    flex: 1,
    backgroundColor: '#712177',
    paddingBottom: 0,
    paddingTop: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
  },
});
