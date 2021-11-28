import {GoogleSignin} from '@react-native-community/google-signin';
import axios, {AxiosInstance} from 'axios';

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
        throw new CalanderServiceException(
          error.response.data.error.message,
          error.response.data.error.code,
        );
      }
    } else {
      throw new CalanderServiceException('NOT AUTHENTICATED');
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
    date: string;
    dateTime?: string;
    timeZone?: string;
  };
  end: {
    date: string;
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
