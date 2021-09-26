import React from 'react';
import { StyleSheet, View, Picker, Alert } from 'react-native';
import { Tab, TopNavigation, TopNavigationAction, Divider, TabBar, Modal, Layout, Button, Text, Select, SelectOptionType } from '@ui-kitten/components';
import { MenuIcon, GoalIcon } from '../../components/icons';
import { AppStorage } from '../../services/app-storage.service';
import { firebase } from '@react-native-firebase/firestore';

export const TraxivityTabs = ({ navigation, state }): React.ReactElement => {

    const items: SelectOptionType[] = []
    for(var i = 1000; i <= 50000; i += 1000) {
      items.push({text: i.toString()})
    }

    const [goal_visible, setGoalVisible] = React.useState<boolean>(false);
    console.log(AppStorage.getTraxivityDetails().goal/500)
    const [selectedOption, setSelectedOption] = React.useState(items[(AppStorage.getTraxivityDetails().goal/1000)-1]);

    const onTabSelect = (index: number): void => {
      navigation.navigate(state.routeNames[index]);
    };

    const renderDrawerAction = (): React.ReactElement => (
        <TopNavigationAction
          icon={MenuIcon}
          onPress={navigation.toggleDrawer}
        />
    );

    const renderBookmarkAction = (): React.ReactElement => (
        <TopNavigationAction
          icon={GoalIcon}
          onPress={() => setGoalVisible(!goal_visible)}
        />
    );

    const submit = () => {
        const ref = firebase.firestore().collection('users').doc(AppStorage.getUser().uid);
        firebase.firestore().runTransaction(async transaction => {
            const doc = await transaction.get(ref);
            console.log(selectedOption.text)
            transaction.update(ref, {dailyStepGoal: parseInt(selectedOption.text)})
        }).then(() => {
            Alert.alert('Thank you', 'Your goal have been saved', [
                {text: 'OK'}
            ])
        }).catch(err => {
            Alert.alert('Oops! An error has occurred.', err+"", [
                {text: 'OK'}
            ])
        })
        setGoalVisible(false);
    }

    const close = () => {
        setGoalVisible(false);
    }

    const renderModal = () => (
        <Layout level='3' style={styles.modalContainer}>
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 8}}>
                    🏆 Daily Step Goal
                </Text>
            </View>
            
            <Text style={{textAlign: 'justify', marginVertical: 8}}>
                Select a new Daily Step Goal
            </Text>

            <Select
                data={items}
                selectedOption={selectedOption}
                onSelect={setSelectedOption}
                style={{width: 250}}
            />
          
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button style={[styles.buttonHalf]} status="primary" onPress={submit}>
              Set Goal
            </Button>
            <Button style={[styles.buttonHalf]} status="warning" onPress={close}>
              Close
            </Button>
          </View>
        </Layout>
    );  
  
    return (
      <>
        <TopNavigation
            title='Traxivity'
            leftControl={renderDrawerAction()}
            rightControls={[renderBookmarkAction()]}
        />
        <Divider/>
        <TabBar
            style={styles.bar}
            /*tabBarStyle={styles.bar}*/
            indicatorStyle={styles.indicator}
            selectedIndex={state.index}
            onSelect={onTabSelect}>
            <Tab titleStyle={styles.title} title='Today'/>
            <Tab titleStyle={styles.title} title='Week'/>
            <Tab titleStyle={styles.title} title='Month'/>
        </TabBar>
        <Modal backdropStyle={styles.backdrop} visible={goal_visible}>
            {renderModal()}
        </Modal>
      </>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    indicator: {
        borderRadius: 0
    },
    bar: {
        height: 50,
    },
    title: {
        fontWeight: 'bold'
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '90%',
        padding: 16,
        borderRadius: 5
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    buttonHalf: {
        width: '48%',
        marginTop: 16,
        marginHorizontal: 5
    },
});