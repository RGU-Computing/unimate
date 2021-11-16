import moment from 'moment';

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: '1s',
    ss: '%ds',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    w: '1w',
    ww: '%dw',
    M: '1m',
    MM: '%dm',
    y: '1y',
    yy: '%dy',
  },
});

export class Notification {
  constructor(
    readonly title: string,
    readonly subtitle: string,
    readonly timestamp: any,
    readonly type: string,
    readonly isImportant: boolean,
  ) {}

  get formattedText(): string {
    const isLong: boolean = this.subtitle.length > 60;
    return isLong ? `${this.subtitle.substring(0, 60)}...` : this.subtitle;
  }

  static first(): Notification {
    return new Notification(
      'Reminder: Mood Diaryz',
      'Add daily diary records and reflect on them.',
      moment(),
      'Emotivity',
      false,
    );
  }

  static second(): Notification {
    return new Notification(
      'Reminder: Mood Tracking',
      'Track your mood daily and keep track of your moods!',
      moment(),
      'Emotivity',
      true,
    );
  }

  static third(): Notification {
    return new Notification(
      'Reminder: Daily Step Goal',
      "Don't forget to keep up with your daily step goal!",
      moment(),
      'Traxivity',
      false,
    );
  }

  static fourth(): Notification {
    return new Notification(
      'Welcome to Unimate!',
      'Thanks for using Unimate!',
      moment(),
      'Emotivity',
      false,
    );
  }
}
