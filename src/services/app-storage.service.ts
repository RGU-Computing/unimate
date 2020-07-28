import { YellowBox } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Mapping, Theme } from './theme.service';
import { EMOTIVITY } from './types';

const MAPPING_KEY: string = 'mapping';
const THEME_KEY: string = 'theme';
let USER: Object = {};
let TRAXIVITY_DETAILS = {goal: 0, steps: 0};
let EMOTIVITY_DETAILS = {status: false, record: {anger: 0, anxiety: 0, happiness: 0, sadness: 0, stress: 0, tired: 0}};

export class AppStorage {

  static hasLaunched = async () => {
    try {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      return hasLaunched === 'true'
    } catch (error) {
      return false;
    }
  }

  static setLaunched = () => {
    AsyncStorage.setItem('hasLaunched', 'true');
  }

  static getUser = () => {
   return USER
  };

  static setUser = (user: Object) => {
    USER = user;
  };

  static setTraxivityDetails = (goal, steps) => {
    TRAXIVITY_DETAILS = {
      goal: goal,
      steps: steps
    };
  }

  static getTraxivityDetails = () => {
    return TRAXIVITY_DETAILS;
  }

  static getEmotivityDetails() {
    return EMOTIVITY_DETAILS;
  }

  static setEmotivityDetails(status: boolean, document = undefined) {

    EMOTIVITY_DETAILS.status = status;
    if (status && document) {
      EMOTIVITY_DETAILS.record = document.data()
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
  
}

/**
 * In a Bare React Native project you should use
 * https://github.com/react-native-community/async-storage
 *
 * However, Expo runs AsyncStorage exported from react-native.
 * Just to save application bundle size, we still using this one.
 */
YellowBox.ignoreWarnings(['AsyncStorage has been extracted']);
