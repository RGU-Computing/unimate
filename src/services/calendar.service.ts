import {GoogleSignin} from '@react-native-community/google-signin';
import axios, {AxiosInstance} from 'axios';
import BackgroundFetch from 'react-native-background-fetch';
import {UtilService} from './util.service';
import {firebase} from '@react-native-firebase/firestore';
import {AppStorage} from './app-storage.service';
import {CalendarNotification, FirebaseService} from './firebase.service';
import moment from 'moment';

const ENDPOINTS = {
  baseUrl: 'https://www.googleapis.com/calendar/v3/',
};

export class CalendarService {
  static restClient: AxiosInstance;

  static getAccessToken = async (): Promise<string> => {
    return (await GoogleSignin.getTokens()).accessToken;
  };

  static initRestClient = async () => {
    let accessToken = await this.getAccessToken();
    this.restClient = axios.create({
      baseURL: ENDPOINTS.baseUrl,
      timeout: 1500,
      headers: {
        'Content-Type': 'applicaition/json',
        Authorization: `Bearer ${accessToken}`,
      },
      responseType: 'json',
    });
  };

  static getCalendar = async (calendarId: string): Promise<any> => {
    let isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      await this.initRestClient();
      try {
        let response: any = (await this.restClient.get(
          `/calendars/${calendarId}`,
        )).data;
        return response;
      } catch (err) {
        let error: any = err;
        throw new CalanderServiceException(
          error.response.data.error.message,
          error.response.data.error.code,
        );
      }
    } else {
      throw new CalanderServiceException('NOT AUTHENTICATED');
    }
  };

  static createEvent = async (
    calendarId: string,
    request: CalendarEventRequest,
  ): Promise<any> => {
    let isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      await this.initRestClient();
      try {
        let response: any = await this.restClient.post(
          `/calendars/${calendarId}/events`,
          request,
          {
            params: {
              conferenceDataVersion: request.conferenceDataVersion,
              maxAttendees: request.maxAttendees,
              sendNotifications: request.sendNotifications,
              sendUpdates: request.sendUpdates,
              supportsAttachments: request.supportsAttachments,
            },
          },
        );
        return response;
      } catch (err) {
        let error: any = err;
        console.log(error.response.data.error.message);
        throw new CalanderServiceException(
          error.response.data.error.message,
          error.response.data.error.code,
        );
      }
    } else {
      throw new CalanderServiceException('NOT AUTHENTICATED');
    }
  };

  static scheduleEventBackground = async stepscount => {
    let status = await BackgroundFetch.configure(
      {minimumFetchInterval: 15},
      async taskId => {
        this.scheduleEvent(stepscount);

        BackgroundFetch.finish(taskId);
      },
      async taskId => {
        console.log('Timeout occured', taskId);
        BackgroundFetch.finish(taskId);
      },
    );

    console.log('BackgroundFetch Status: ', status);

    BackgroundFetch.scheduleTask({
      taskId: 'calendar.event.task',
      forceAlarmManager: true,
      delay: 5000,
      periodic: true,
      enableHeadless: true,
    });
  };

  static scheduleEvent = async stepscount => {
    let dateToday = new Date();
    let dateTodayString = dateToday.toISOString().split('T')[0];
    let currentTime = UtilService.getTimeIn24();
    let isInRangeMorning = UtilService.isTimeBetween(
      currentTime,
      '0:00',
      '8:00',
    );
    let isInRangeAfternoon = UtilService.isTimeBetween(
      currentTime,
      '8:00',
      '16:00',
    );

    console.log('Current Time ', currentTime);

    console.log('Morning', isInRangeMorning);
    console.log('Afternoon', isInRangeAfternoon);

    let existingNotifDate:
      | any
      | CalendarNotification = await FirebaseService.getClanedarNotifications();

    console.log('Existing', existingNotifDate);

    if (
      existingNotifDate == null ||
      (existingNotifDate !== null && existingNotifDate.date !== dateTodayString)
    ) {
      let currentDate = new Date().toISOString().split('T')[0];

      let startTime = '';
      let endTime = '';

      if (isInRangeMorning) {
        startTime = '06:00:00+05:30';
        endTime = '07:00:00+05:30';
      }
      if (isInRangeAfternoon) {
        startTime = '17:00:00+05:30';
        endTime = '18:00:00+05:30';
      }

      let startDateTime = `${currentDate}T${startTime}`;
      let endDateTime = `${currentDate}T${endTime}`;

      console.log(startDateTime, ' and ', endDateTime);

      let summary = `You have to walk ${stepscount} steps today.`;
      console.log(summary);

      let res: any;

      try {
        res = await this.createEvent('primary', {
          sendUpdates: 'all',
          maxAttendees: 1,
          sendNotifications: true,
          supportsAttachments: false,
          end: {
            dateTime: endDateTime,
            timeZone: 'Asia/Colombo',
          },
          start: {
            dateTime: startDateTime,
            timeZone: 'Asia/Colombo',
          },
          summary: summary,
        });

        console.log('Calendar ID ', res.data.id);

        await FirebaseService.createCalendarNotification({
          date: dateTodayString,
          time: isInRangeMorning ? 'morning' : 'evening',
          calId: res.data.id,
        });
      } catch (e) {
        console.log('ERRRORRR', e);
      }
    } else {
      console.log('not in the range');
    }
  };
}

export interface CalendarEventRequest {
  conferenceDataVersion?: number;
  maxAttendees?: number;
  sendNotifications?: boolean;
  sendUpdates?: string;
  supportsAttachments?: boolean;
  start: {
    date?: string;
    dateTime?: string;
    timeZone?: string;
  };
  end: {
    date?: string;
    dateTime?: string;
    timeZone?: string;
  };
  anyoneCanAddSelf?: boolean;
  attendees?: Array<any>;
  colorId?: string;
  description?: string;
  location?: string;
  reminders?: Array<any>;
  status?: string;
  summary?: string;
  transparency?: string;
  visibility?: string;
}

export interface CalendarEventResponse {}

export class CalanderServiceException extends Error {
  errorCode?: string;
  errorMsg?: string;
  constructor(msg: string, errorCode?: string) {
    super(msg);
    this.errorMsg = msg;
    this.errorCode = errorCode;
  }
}
