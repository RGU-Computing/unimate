import {YellowBox} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Mapping, Theme} from './theme.service';
import {DATE, EMOTIVITY} from './types';
import {UtilService} from './util.service';
import {TodoInput} from 'src/components/todo-input.component';

const MAPPING_KEY: string = 'mapping';
const THEME_KEY: string = 'theme';
const TODO_KEY: string = 'todo_key';

let USER: Object = {};
let TRAXIVITY_DETAILS = {goal: 0, steps: 0};
let EMOTIVITY_DETAILS = {
  status: false,
  record: {anger: 0, anxiety: 0, happiness: 0, sadness: 0, stress: 0, tired: 0},
};
let DIARY_DETAILS = false;
let THANKS_DETAILS = false;

export class AppStorage {
  static hasLaunched = async () => {
    try {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      return hasLaunched === 'true';
    } catch (error) {
      return false;
    }
  };

  static setLaunched = () => {
    AsyncStorage.setItem('hasLaunched', 'true');
  };

  static setMessage = value => {
    console.log(UtilService.getDateToday(DATE.FORMATS.DB).toString());
    console.log(value);
    AsyncStorage.setItem(
      UtilService.getDateToday(DATE.FORMATS.DB).toString(),
      value,
    );
  };

  static getMessage = async () => {
    try {
      const message = await AsyncStorage.getItem(
        UtilService.getDateToday(DATE.FORMATS.DB).toString(),
      );
      console.log('message');
      console.log(message);
      return message;
    } catch (error) {
      console.log('err');
      return '';
    }
  };

  static getUser = () => {
    return USER;
  };

  static getStoredUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      return JSON.parse(user);
    } catch (error) {
      return false;
    }
  };

  static setUser = (user: Object) => {
    console.log('setUser');
    console.log(user);
    USER = user;
  };

  static saveUser = async user => {
    await AsyncStorage.setItem('user', JSON.stringify(user))
      .then(() => {
        console.log('saved');
      })
      .catch(() => {
        console.log('not saved');
      });
  };

  static setTraxivityDetails = (goal, steps) => {
    console.log('setTrax');
    console.log(goal);
    console.log(steps);
    TRAXIVITY_DETAILS = {
      goal: goal,
      steps: steps,
    };
  };

  static getTraxivityDetails = () => {
    return TRAXIVITY_DETAILS;
  };

  static getEmotivityDetails() {
    return EMOTIVITY_DETAILS;
  }

  static setDiaryDetails = value => {
    DIARY_DETAILS = value;
  };

  static getDiaryDetails = () => {
    return DIARY_DETAILS;
  };

  static setThanxDetails = value => {
    THANKS_DETAILS = value;
  };

  static getThanxDetails = () => {
    return THANKS_DETAILS;
  };

  static setEmotivityDetails(status: boolean, document = undefined) {
    EMOTIVITY_DETAILS.status = status;
    if (status && document) {
      EMOTIVITY_DETAILS.record = document.data();
    }
  }

  static getTheme = (fallback?: Theme): Promise<Theme> => {
    return AsyncStorage.getItem(THEME_KEY).then((theme: Theme) => {
      return theme || fallback;
    });
  };

  static setTheme = (theme: Theme): Promise<void> => {
    return AsyncStorage.setItem(THEME_KEY, theme);
  };

  static getMapping = (fallback?: Mapping): Promise<Mapping> => {
    return AsyncStorage.getItem(MAPPING_KEY).then((mapping: Mapping) => {
      return mapping || fallback;
    });
  };

  static setMapping = (mapping: Mapping): Promise<void> => {
    return AsyncStorage.setItem(MAPPING_KEY, mapping);
  };

  // To Do List
  static saveToDoList = async toDoList => {
    await AsyncStorage.setItem(TODO_KEY, JSON.stringify(toDoList))
      .then(() => {})
      .catch(() => {
        console.log('Failed to save the ToDo List to the storage');
      });
  };

  static getToDoList = async () => {
    try {
      const toDoList = await AsyncStorage.getItem(TODO_KEY);
      return JSON.parse(toDoList);
    } catch (error) {
      console.log('Failed to fetch the ToDo List from the storage');
      return false;
    }
  };
}

/**
 * In a Bare React Native project you should use
 * https://github.com/react-native-community/async-storage
 *
 * However, Expo runs AsyncStorage exported from react-native.
 * Just to save application bundle size, we still using this one.
 */
YellowBox.ignoreWarnings(['AsyncStorage has been extracted']);
