import firestore, {
  firebase,
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { now } from 'moment';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import { User } from 'src/models/auth/user';
import { getSteps } from '../api/googleFitApi';
import { Notification } from '../models/notification';
import { AppStorage } from './app-storage.service';
import { ACTION_CARDS, DATE, DIARY, EMOTIVITY, USERS } from './types';
import { UtilService } from './util.service';
import _ from "lodash";
import { ThanxMessage } from 'src/models/ThanxMessage';
const _onError = (e: any): void => {
  console.error(e);
};

export class FirebaseService {
  static setPushToken(token) {
    const { uid } = AppStorage.getUser();
    firestore()
      .collection(USERS.DATABASE.REF)
      .doc(uid)
      .update({
        pushToken: token,
      })
      .then(function () {
        console.log('Token updated: ' + token);
      })
      .catch(function (error) {
        console.error('Error updating token: ', error);
      });
  }

  static getTimeStamp = () => {
    //return firebase.firestore.FieldValue.serverTimestamp()
    return now();
  };

  static getTodayActionCard = (onSuccess, onError = _onError) => {
    firestore()
      .collection(ACTION_CARDS.DATABASE.REF)
      .where(
        ACTION_CARDS.DATABASE.FIELDS.DATE,
        '==',
        UtilService.getDateToday(DATE.FORMATS.DB),
      )
      .get()
      .then(onSuccess, onError);
  };

  static subscribeForActionCardReacts = (
    docID,
    onSuccess,
    onError = _onError,
  ) => {
    return firestore()
      .collection(ACTION_CARDS.DATABASE.REF)
      .doc(docID)
      .onSnapshot(onSuccess, onError);
  };

  static addActionCardReaction = (actionCardID, REACTION_TYPE) => {
    const { uid } = AppStorage.getUser();

    firestore()
      .collection(ACTION_CARDS.DATABASE.REF)
      .doc(actionCardID)
      .update({
        reacts: firebase.firestore.FieldValue.arrayUnion({
          [ACTION_CARDS.DATABASE.FIELDS.REACTS.TYPE]: REACTION_TYPE,
          [ACTION_CARDS.DATABASE.FIELDS.REACTS.USER]: uid,
        }),
      })
      .catch(e => {
        console.warn(e);
      });
  };

  static updateActionCardReaction = (
    actionCardID,
    oldReaction,
    REACTION_TYPE,
  ) => {
    const { uid } = AppStorage.getUser();

    //TODO Change the method
    firestore()
      .collection(ACTION_CARDS.DATABASE.REF)
      .doc(actionCardID)
      .update({
        reacts: firebase.firestore.FieldValue.arrayRemove(oldReaction),
      })
      .catch(e => {
        console.warn(e);
      });
    firestore()
      .collection(ACTION_CARDS.DATABASE.REF)
      .doc(actionCardID)
      .update({
        reacts: firebase.firestore.FieldValue.arrayUnion({
          [ACTION_CARDS.DATABASE.FIELDS.REACTS.TYPE]: REACTION_TYPE,
          [ACTION_CARDS.DATABASE.FIELDS.REACTS.USER]: uid,
        }),
      })
      .catch(e => console.warn(e));
  };

  static removeActionCardReaction = (actionCardID, oldReaction) => {
    firestore()
      .collection(ACTION_CARDS.DATABASE.REF)
      .doc(actionCardID)
      .update({
        reacts: firebase.firestore.FieldValue.arrayRemove(oldReaction),
      })
      .catch(e => {
        console.warn(e);
      });
  };

  static getIsEmotivityDoneToday = (onSuccess, onError = _onError) => {
    const { uid } = AppStorage.getUser();
    let query = firestore().collection(EMOTIVITY.DATABASE.REF);
    query = query.where(EMOTIVITY.DATABASE.FIELDS.USER, '==', uid);
    query = query.where(
      EMOTIVITY.DATABASE.FIELDS.DATE,
      '==',
      UtilService.getDateToday(DATE.FORMATS.DB_UNIX),
    );
    query.get().then(onSuccess, onError);
  };

  static subscribeForEmotivity = (onSuccess, onError = _onError) => {
    const { uid } = AppStorage.getUser();
    let query = firestore().collection(EMOTIVITY.DATABASE.REF);
    query = query.where(EMOTIVITY.DATABASE.FIELDS.USER, '==', uid);
    return (query = query
      .where(
        EMOTIVITY.DATABASE.FIELDS.DATE,
        '==',
        UtilService.getDateToday(DATE.FORMATS.DB_UNIX),
      )
      .onSnapshot(onSuccess, onError));
  };

  static getEmotivityData = (
    startDate,
    endDate,
    onSuccessMood,
    onSuccessDiary,
    onError = _onError,
  ) => {
    const { uid } = AppStorage.getUser();
    firestore()
      .collection(EMOTIVITY.DATABASE.REF)
      .where(EMOTIVITY.DATABASE.FIELDS.USER, '==', uid)
      .where(EMOTIVITY.DATABASE.FIELDS.DATE, '>=', startDate)
      .where(EMOTIVITY.DATABASE.FIELDS.DATE, '<=', endDate)
      .get()
      .then(onSuccessMood, onError);
    firestore()
      .collection(DIARY.DATABASE.REF)
      .where(DIARY.DATABASE.FIELDS.USER, '==', uid)
      .where(EMOTIVITY.DATABASE.FIELDS.DATE, '>=', startDate)
      .where(EMOTIVITY.DATABASE.FIELDS.DATE, '<=', endDate)
      .get()
      .then(onSuccessDiary, onError);
  };

  static addMoodTrackingRecord = scores => {
    const { uid } = AppStorage.getUser();
    firestore()
      .collection(EMOTIVITY.DATABASE.REF)
      .add({
        [EMOTIVITY.DATABASE.FIELDS.USER]: uid,
        [EMOTIVITY.DATABASE.FIELDS.DATE]: UtilService.getDateToday(
          DATE.FORMATS.DB_UNIX,
        ),
        [EMOTIVITY.DATABASE.FIELDS.ANGER]:
          scores[EMOTIVITY.DATABASE.FIELDS.ANGER],
        [EMOTIVITY.DATABASE.FIELDS.ANXIETY]:
          scores[EMOTIVITY.DATABASE.FIELDS.ANXIETY],
        [EMOTIVITY.DATABASE.FIELDS.HAPPINESS]:
          scores[EMOTIVITY.DATABASE.FIELDS.HAPPINESS],
        [EMOTIVITY.DATABASE.FIELDS.SADNESS]:
          scores[EMOTIVITY.DATABASE.FIELDS.SADNESS],
        [EMOTIVITY.DATABASE.FIELDS.STRESS]:
          scores[EMOTIVITY.DATABASE.FIELDS.STRESS],
        [EMOTIVITY.DATABASE.FIELDS.TIRED]:
          scores[EMOTIVITY.DATABASE.FIELDS.TIRED],
      })
      .then(document => {
        console.log('Document written with ID: ', document.id);
      })
      .catch(error => {
        console.warn('Error adding document: ', error);
      });
  };

  static addNewDiaryEntry = (STATUS_TYPE, data) => {
    const { uid } = AppStorage.getUser();
    const questionsArr = [];
    data.forEach(item => {
      questionsArr.push(item);
    });
    firestore()
      .collection(DIARY.DATABASE.REF)
      .add({
        [DIARY.DATABASE.FIELDS.USER]: uid,
        [DIARY.DATABASE.FIELDS.CONVERSATIONS]: data,
        [DIARY.DATABASE.FIELDS.STATUS]: STATUS_TYPE,
        [DIARY.DATABASE.FIELDS.DATE]: UtilService.getDateToday(
          DATE.FORMATS.DB_UNIX,
        ),
      });
  };

  static addReflection = (id, question) => {
    firestore()
      .collection(DIARY.DATABASE.REF)
      .doc(id)
      .update({
        [DIARY.DATABASE.FIELDS.STATUS]: DIARY.DATABASE.STATUS.COMPLETE,
        [DIARY.DATABASE.FIELDS
          .CONVERSATIONS]: firebase.firestore.FieldValue.arrayUnion(question),
      })
      .catch(e => {
        console.warn(e);
      });
  };

  static getTodayDiaryEntry = (onSuccess, onError = _onError) => {
    const { uid } = AppStorage.getUser();
    let query = firestore().collection(DIARY.DATABASE.REF);
    query = query.where(DIARY.DATABASE.FIELDS.USER, '==', uid);
    query = query.where(
      DIARY.DATABASE.FIELDS.DATE,
      '==',
      UtilService.getDateToday(DATE.FORMATS.DB_UNIX),
    );
    query.get().then(onSuccess, onError);
  };

  static getAllUsers = (
    next: (
      data: FirebaseFirestoreTypes.QuerySnapshot,
    ) => void | PromiseLike<void>,
  ) => {
    return firestore()
      .collection(USERS.DATABASE.REF)
      .get()
      .then(next)
      .catch(error =>
        console.log(`Error while getting users: ${error.message}`),
      );
  };

  static subscribeForDiaryEntry = (docID, onSuccess, onError = _onError) => {
    return firestore()
      .collection(DIARY.DATABASE.REF)
      .doc(docID)
      .onSnapshot(onSuccess, onError);
  };

  static setUser = (user: User) => {
    const ref = firestore()
      .collection(USERS.DATABASE.REF)
      .doc(user.uid);
    firestore()
      .runTransaction(async transaction => {
        const doc = await transaction.get(ref);
        if (!doc.exists) {
          transaction.set(ref, {
            user: user,
            dailyStepGoal: 5000,
            notifications: [
              new Notification(
                'Welcome to Unimate!',
                'Thanks for using Unimate!',
                Date.now(),
                'Emotivity',
                false,
              ),
              new Notification(
                'Reminder: Daily Step Goal',
                "Don't forget to keep up with your daily step goal!",
                Date.now(),
                'Traxivity',
                false,
              ),
              new Notification(
                'Reminder: Mood Tracking',
                'Track your mood daily and keep track of your moods!',
                Date.now(),
                'Emotivity',
                true,
              ),
              new Notification(
                'Reminder: Mood Diary',
                'Add daily diary records and reflect on them.',
                Date.now(),
                'Emotivity',
                false,
              ),
            ],
          });
        } else {
          transaction.update(ref, { user: user });
        }
      })
      .then(function () {
        console.log('setUser success!');
      })
      .catch(function (error) {
        console.warn('setUser failed: ', error);
      });
  };

  static getStepsToday = (goal, onSuccess) => {
    const options = {
      scopes: [Scopes.FITNESS_ACTIVITY_READ_WRITE],
    };
    GoogleFit.authorize(options)
      .then(() => {
        const start = new Date();
        const end = new Date();
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        getSteps(
          { startDate: start, endDate: end },
          null,
          (res: string | any[]) => {
            console.log(goal);
            AppStorage.setTraxivityDetails(
              goal,
              res.length > 0 ? res[0].value : 0,
            );
            onSuccess();
          },
        );
      })
      .catch(err => console.log(err));
  };

  static subscribeForTraxivity = (onSuccess, onError = _onError) => {
    const { uid } = AppStorage.getUser();
    firestore()
      .collection(USERS.DATABASE.REF)
      .doc(uid)
      .onSnapshot(onSuccess, onError);
  };

  static subscribeForNotifications = (onSuccess, onError = _onError) => {
    const { uid } = AppStorage.getUser();
    return firestore()
      .collection(USERS.DATABASE.REF)
      .doc(uid)
      .onSnapshot(onSuccess, onError);
  };

  static getChatList = async () => {
    const { uid: loggedUserId } = AppStorage.getUser();

    const user = await firestore()
      .collection(USERS.DATABASE.REF)
      .doc(loggedUserId)
      .get();
    return user?.data()?.messages;
  };

  static getReceivedChats = async (senderId: string) => {
    const { uid: curUId } = AppStorage.getUser();
    const users = await firestore().collection(USERS.DATABASE.REF)
    const sent = users.doc(curUId)

    return (await sent.get()).data()?.messages.filter(el => el.user._id === senderId)
  }

  static getSentChatsByReceiverId = async (receiverUID: string) => {
    // returns sent chats by current user to given reciverid
    const { uid: currUID } = AppStorage.getUser();
    const users = await firestore().collection(USERS.DATABASE.REF)
    console.log("RECIVER ID", { receiverUID });

    const received = await users.doc(receiverUID);

    const msgs = (await received.get()).data()?.messages;

    return msgs.filter((el: ThanxMessage) => el.user._id === currUID);
  }

  static sendChat = async (msg: ThanxMessage) => {
    const { uid: currUID } = AppStorage.getUser();
    const { _id: toUID } = msg;
    console.log("send service", { toUID, msg });

    const users = await firestore().collection(USERS.DATABASE.REF)
    return await users.doc(msg._id).update({
      messages: firebase.firestore.FieldValue.arrayUnion(msg)
    })

  }

  static setChatListener = async (onChangeCallback: (doc) => void) => {
    const { uid } = AppStorage.getUser();
    return firestore().collection("users").doc(uid)
      .onSnapshot(onChangeCallback);
  }


}
