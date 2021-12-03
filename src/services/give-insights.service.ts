import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import GoogleFit, {Scopes} from 'react-native-google-fit';
import {getSteps} from '../api/googleFitApi';
import {AppStorage} from './app-storage.service';
import {DATE, DIARY, EMOTIVITY} from './types';
import {UtilService} from './util.service';

const _onError = (e: any): void => {
  console.error(e);
};

export class InsightsService {
  static getTodayEmotivityAnalysis = (
    onSuccessMood:
      | ((
          value: FirebaseFirestoreTypes.QuerySnapshot,
        ) =>
          | FirebaseFirestoreTypes.QuerySnapshot
          | PromiseLike<FirebaseFirestoreTypes.QuerySnapshot>
        )
      | null
      | undefined,
    onSuccessDiary:
      | ((
          value: FirebaseFirestoreTypes.QuerySnapshot,
        ) =>
          | FirebaseFirestoreTypes.QuerySnapshot
          | PromiseLike<FirebaseFirestoreTypes.QuerySnapshot>
        )
      | null
      | undefined,
    onError = _onError,
  ) => {
    const {uid} = AppStorage.getUser();
    firestore()
      .collection(EMOTIVITY.DATABASE.REF)
      .where(EMOTIVITY.DATABASE.FIELDS.USER, '==', uid)
      .where(
        EMOTIVITY.DATABASE.FIELDS.DATE,
        '==',
        UtilService.getDateToday(DATE.FORMATS.DB_UNIX),
      )
      .get()
      .then(onSuccessMood, onError);
    firestore()
      .collection(DIARY.DATABASE.REF)
      .where(DIARY.DATABASE.FIELDS.USER, '==', uid)
      .where(
        EMOTIVITY.DATABASE.FIELDS.DATE,
        '==',
        UtilService.getDateToday(DATE.FORMATS.DB_UNIX),
      )
      .get()
      .then(onSuccessDiary, onError);
  };

  static getDailySteps = (goal: any, onSuccess: () => void) => {
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
          {startDate: start, endDate: end},
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

  static getWeeklySteps = (goal: any, onSuccess: () => void) => {
    const options = {
      scopes: [Scopes.FITNESS_ACTIVITY_READ_WRITE],
    };
    GoogleFit.authorize(options)
      .then(() => {
        const start = new Date();
        const end = new Date();
        start.setHours(0, 0, 0, 0);
        end.setHours(24 * 6 + 23, 59, 59, 999);
        getSteps(
          {startDate: start, endDate: end},
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
}
