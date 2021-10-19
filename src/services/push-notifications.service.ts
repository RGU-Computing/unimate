import {RecyclerViewBackedScrollViewComponent, YellowBox} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Mapping, Theme} from './theme.service';
import {DATE, EMOTIVITY} from './types';
import {UtilService} from './util.service';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {AppStorage} from './app-storage.service';
import BackgroundFetch from 'react-native-background-fetch';
import {
  getSteps,
  getCals,
  getDists,
  getStepsAsync,
  getSteps1,
} from '../api/googleFitApi';
import TraxivityDataTab from '../components/traxivity-data.component';
import {PushNotificationMessages} from './push-notification-messages.service';
import GoogleFit, {Scopes} from 'react-native-google-fit';
import {FirebaseService} from './firebase.service';

export class PushNotifications {
  constructor() {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        // console.log('TOKEN:', token);
      },
      onNotification: function(notification) {
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      popInitialNotification: true,
      requestPermissions: true,
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: false,
        sound: false,
      },
    });

    PushNotification.createChannel(
      {
        channelId: 'reminders', // (required)
        channelName: 'Task reminder notifications', // (required)
        channelDescription: 'Reminder for any tasks',
      },
      () => {},
    );

    PushNotification.getScheduledLocalNotifications(rn => {
      console.log('SN --- ', rn);
    });
  }

  schduleNotification = date => {
    PushNotification.localNotificationSchedule({
      channelId: 'reminders',
      title: '🕙 How is your day today?',
      message:
        "You haven't told us about your day yet. Log into the Unimate app to say about your day",
      date,
      allowWhileIdle: true,
    });
  };

  initBackgroundFetch = async () => {
    // BackgroundFetch event handler.
    const onEvent = async taskId => {
      console.log('[BackgroundFetch] task: ', taskId);
      // Do your background work...
      //await this.addEvent(taskId);
      // IMPORTANT:  You must signal to the OS that your task is complete.
      BackgroundFetch.finish(taskId);
    };

    // Timeout callback is executed when your Task has exceeded its allowed running-time.
    // You must stop what you're doing immediately BackgroundFetch.finish(taskId)
    const onTimeout = async taskId => {
      console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
      BackgroundFetch.finish(taskId);
    };

    // Initialize BackgroundFetch only once when component mounts.
    let status = await BackgroundFetch.configure(
      {
        minimumFetchInterval: 15,
        forceAlarmManager: true,
        stopOnTerminate: false,
        enableHeadless: true,
      },
      onEvent,
      onTimeout,
    );

    console.log('[BackgroundFetch] configure status: ', status);
  };

  //Emotivity related notifications
  //Every day @8PM checks whther the user completed the meotivity questions
  //If he doesnt send a notification
  emotivityCompletionNotification = async () => {
    let tempNotificatinoList = await AppStorage.getNotificationsList();
    // let tempNotificatinoList1;

    console.log(new Date(Date.now()).getHours());
    if (new Date(Date.now()).getHours() == 20) {
    console.log('INSIDE EMOTIVITY');
    const emotivityDataCompleted = await AppStorage.checkEmotivityTodayCompleted();
    // Check whether the user has filled eMotivity data. If there is no data it will give a notification
    if (
      emotivityDataCompleted == null ||
      !(
        Number(emotivityDataCompleted.date) ==
        Number(UtilService.getDateTodayNoFormat())
      )
    ) {
      if (emotivityDataCompleted != null) {
        // Check how many days eMotivity not tracked
        let timeDifferenceLastEntry =
          (Number(UtilService.getDateTodayNoFormat()) -
            Number(emotivityDataCompleted.date)) /
          86400000;
        if (Math.round(timeDifferenceLastEntry) >= 3) {
          // If the eMotivity hasnt tracked 3 days or more than 3 days
          let notificationText = PushNotificationMessages.getEmotivityNotTrackedText();
          PushNotification.localNotificationSchedule({
            channelId: 'reminders',
            title: '🕙 eMotivity 😀',
            message: notificationText,
            date: new Date(Date.now()),
            allowWhileIdle: true,
          });
          tempNotificatinoList = this.addNotification(
            tempNotificatinoList,
            true,
            notificationText,
            new Date(Date.now()),
            '🕙 eMotivity 😀',
            'Emotivity',
          );
        } else {
          // If the eMotivity hasnt tracked less than 3 days
          let notificationText = PushNotificationMessages.getEmotivityDailyReminderText();
          PushNotification.localNotificationSchedule({
            channelId: 'reminders',
            title: '🕙 eMotivity 😀',
            message: notificationText,
            date: new Date(Date.now()),
            allowWhileIdle: true,
          });
          tempNotificatinoList = this.addNotification(
            tempNotificatinoList,
            true,
            notificationText,
            new Date(Date.now()),
            '🕙 eMotivity 😀',
            'Emotivity',
          );
        }
      } else {
        // If the eMotivity hasnt tracked yet. May be due to local data deletion, application newly installed
        let notificationText = PushNotificationMessages.getEmotivityDailyReminderText();
        PushNotification.localNotificationSchedule({
          channelId: 'reminders',
          title: '🕙 eMotivity 😀',
          message: notificationText,
          date: new Date(Date.now()),
          allowWhileIdle: true,
        });
        tempNotificatinoList = this.addNotification(
          tempNotificatinoList,
          true,
          notificationText,
          new Date(Date.now()),
          '🕙 eMotivity 😀',
          'Emotivity',
        );
      }
    }

    console.log('INSIDE SAY THANKX');
    //SayThanx related notifications
    //Every day @8PM checks whther the user completed the meotivity questions
    //If he doenst send a notification
    const sayThanxDataCompleted = await AppStorage.checkSayThanxTodayCompleted();
    // Check whether the user has filled sayThanx data. If there is no data it will give a notification
    if (
      sayThanxDataCompleted == null ||
      !(
        Number(sayThanxDataCompleted.date) ==
        Number(UtilService.getDateTodayNoFormat())
      )
    ) {
      if (sayThanxDataCompleted != null) {
        // Check how many days sayThanx not tracked
        let timeDifferenceLastEntry =
          (Number(UtilService.getDateTodayNoFormat()) -
            Number(sayThanxDataCompleted.date)) /
          86400000;
        if (Math.round(timeDifferenceLastEntry) >= 3) {
          // If the sayThanx hasnt tracked 3 days or more than 3 days
          let notificationText = PushNotificationMessages.getSayThanxNotTrackedText();
          PushNotification.localNotificationSchedule({
            channelId: 'reminders',
            title: '🕙 SayThanx 🙏',
            message: notificationText,
            date: new Date(Date.now()),
            allowWhileIdle: true,
          });
          tempNotificatinoList = this.addNotification(
            tempNotificatinoList,
            true,
            notificationText,
            new Date(Date.now()),
            '🕙 SayThanx 🙏',
            'SayThanx',
          );
        } else {
          // If the sayThanx hasnt tracked less than 3 days
          let notificationText = PushNotificationMessages.getSayThanxDailyReminderText();
          PushNotification.localNotificationSchedule({
            channelId: 'reminders',
            title: '🕙 SayThanx 🙏',
            message: notificationText,
            date: new Date(Date.now()),
            allowWhileIdle: true,
          });
          tempNotificatinoList = this.addNotification(
            tempNotificatinoList,
            true,
            notificationText,
            new Date(Date.now()),
            '🕙 SayThanx 🙏',
            'SayThanx',
          );
        }
      } else {
        // If the sayThanx hasnt tracked yet. May be due to local data deletion, application newly installed
        let notificationText = PushNotificationMessages.getSayThanxDailyReminderText();
        PushNotification.localNotificationSchedule({
          channelId: 'reminders',
          title: '🕙 SayThanx 🙏',
          message: notificationText,
          date: new Date(Date.now()),
          allowWhileIdle: true,
        });
        tempNotificatinoList = this.addNotification(
          tempNotificatinoList,
          true,
          notificationText,
          new Date(Date.now()),
          '🕙 SayThanx 🙏',
          'SayThanx',
        );
      }
    }

    console.log('INSIDE TRAXIVITY');
    //Traxivity related notifications
    //Weekly check whether the average

    let stepsCountFromGoogleFit: number = 0;
    try {
      const options = {
        scopes: [Scopes.FITNESS_ACTIVITY_READ_WRITE],
      };
      await GoogleFit.authorize(options)
        .then(async res => {
          stepsCountFromGoogleFit = await this._getData();
          console.log(stepsCountFromGoogleFit);
        })
        .catch(err => console.log(err));

      const traxivityGoal = await AppStorage.getDailyStepsGoal();

      if (stepsCountFromGoogleFit >= traxivityGoal.goal) {
        //Full Achievement daily step goal (100% of goal)
        let notificationText = PushNotificationMessages.getTraxivityFullAchivementText();
        PushNotification.localNotificationSchedule({
          channelId: 'reminders',
          title: '🕙 Traxivity 🏃',
          message: notificationText,
          date: new Date(Date.now()),
          allowWhileIdle: true,
        });
        tempNotificatinoList = this.addNotification(
          tempNotificatinoList,
          true,
          notificationText,
          new Date(Date.now()),
          '🕙 Traxivity 🏃',
          'Traxivity',
        );
      } else if (
        Math.round((stepsCountFromGoogleFit / traxivityGoal.goal) * 100) / 100 >
        0.75
      ) {
        //High Achievement daily step goal (>75% of Goal)

        let notificationText = PushNotificationMessages.getTraxivityHighAchivementText();
        PushNotification.localNotificationSchedule({
          channelId: 'reminders',
          title: '🕙 Traxivity 🏃',
          message: notificationText,
          date: new Date(Date.now()),
          allowWhileIdle: true,
        });
        tempNotificatinoList = this.addNotification(
          notificationText,
          true,
          notificationText,
          new Date(Date.now()),
          '🕙 Traxivity 🏃',
          'Traxivity',
        );
      } else if (
        Math.round((stepsCountFromGoogleFit / traxivityGoal.goal) * 100) / 100 >
        0.5
      ) {
        //Medium Achievement daily step goal (> 50% of goal)

        let notificationText = PushNotificationMessages.getTraxivityMediumAchivementText();
        PushNotification.localNotificationSchedule({
          channelId: 'reminders',
          title: '🕙 Traxivity 🏃',
          message: notificationText,
          date: new Date(Date.now()),
          allowWhileIdle: true,
        });
        tempNotificatinoList = this.addNotification(
          tempNotificatinoList,
          true,
          notificationText,
          new Date(Date.now()),
          '🕙 Traxivity 🏃',
          'Traxivity',
        );
      } else {
        //Low Achievement daily step goal (< 50% of goal)

        let notificationText = PushNotificationMessages.getTraxivityLowAchivementText();
        PushNotification.localNotificationSchedule({
          channelId: 'reminders',
          title: '🕙 Traxivity 🏃',
          message: notificationText,
          date: new Date(Date.now()),
          allowWhileIdle: true,
        });
        tempNotificatinoList = this.addNotification(
          tempNotificatinoList,
          true,
          notificationText,
          new Date(Date.now()),
          '🕙 Traxivity 🏃',
          'Traxivity',
        );
      }
    } catch (error) {
      console.log(error);
    }

    if (tempNotificatinoList.length > 0) {
      AppStorage.saveNotificationsList(tempNotificatinoList);
    }
    }
  };

  addNotification = (
    currentArr,
    isImportant,
    subtitle,
    timestamp,
    title,
    type,
  ) => {
    if (currentArr != null && currentArr.length > 0) {
      const userInput = [
        {
          isImportant: isImportant,
          subtitle: subtitle,
          timestamp: timestamp,
          title: title,
          type: type,
        },
      ];
      const updatedArr = userInput.concat(currentArr);
      // await AppStorage.saveNotificationsList(updatedArr);
      // setTodoItems(updatedArr);

      return updatedArr;
    } else {
      const tempIni = [
        {
          isImportant: isImportant,
          subtitle: subtitle,
          timestamp: timestamp,
          title: title,
          type: type,
        },
      ];
      // await AppStorage.saveNotificationsList(tempIni);
      // setTodoItems(tempIni);
      return tempIni;
    }
  };

  async _getData() {
    var start = new Date();
    var end = new Date();
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    const options = {
      startDate: start,
      endDate: end,
    };

    var stepsCount: number = 0;
    var resResult;
    try {
      stepsCount = await getStepsAsync(options, resResult);
      return stepsCount;
    } catch (error) {
      return stepsCount;
    }
  }
}

/**
 * In a Bare React Native project you should use
 * https://github.com/react-native-community/async-storage
 *
 * However, Expo runs AsyncStorage exported from react-native.
 * Just to save application bundle size, we still using this one.
 */
YellowBox.ignoreWarnings(['AsyncStorage has been extracted']);
