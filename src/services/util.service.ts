import moment from 'moment';
import { DATE } from './types'
import { AppStorage } from './app-storage.service';

export class UtilService {

    static getDateToday = (DATE_FORMAT_TYPE = DATE.FORMATS.DEFAULT) => {
      if (DATE_FORMAT_TYPE === DATE.FORMATS.DB_UNIX) {
        const today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setMilliseconds(0);
        today.setSeconds(0);
        return today.getTime();
      }
        return moment().format(DATE_FORMAT_TYPE);
    }

    static getDateYesterday = (DATE_FORMAT_TYPE = DATE.FORMATS.DEFAULT) => {
      if (DATE_FORMAT_TYPE === DATE.FORMATS.DB_UNIX) {
        const yesterday = moment().subtract(1, 'days').toDate();
        yesterday.setHours(0);
        yesterday.setMinutes(0);
        yesterday.setMilliseconds(0);
        yesterday.setSeconds(0);
        return yesterday.getTime();
      }
        return moment().subtract(1, 'days').format(DATE_FORMAT_TYPE);
    }

    static getDateWeekAgo = (DATE_FORMAT_TYPE = DATE.FORMATS.DEFAULT) => {
      if (DATE_FORMAT_TYPE === DATE.FORMATS.DB_UNIX) {
        const date = moment().subtract(7, 'days').toDate();
        date.setHours(0);
        date.setMinutes(0);
        date.setMilliseconds(0);
        date.setSeconds(0);
        return date.getTime();
      }
        return moment().subtract(7, 'days').format(DATE_FORMAT_TYPE);
    }

    static getDateFromDatabaseDateFormat = (dateDB) => {
        return moment(dateDB).format(DATE.FORMATS.DEFAULT)
    }

    static getRelativeTime = (dateString) => {
        return moment(dateString).fromNow();
    }

    static getUserGreeting = () => {
        
        const currentTime = moment();
        //TODO
        const user = AppStorage.getUser().displayName.substr(0,AppStorage.getUser().displayName.indexOf(' '));

        if (!currentTime || !currentTime.isValid()) return '👋 Hello, ' + user
      
        const splitAfternoon = 12;
        const splitEvening = 17;
        const currentHour = parseFloat(currentTime.format('HH'));
      
        if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
          return '🌞 Good Afternoon, ' + user
        } else if (currentHour >= splitEvening) {
          return '✨ Good Evening, ' + user
        }
        return '🌅 Good Morning, ' + user
      }

}

