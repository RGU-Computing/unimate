export class Notification {

  constructor(readonly title: string, readonly subtitle: string, readonly date: string, readonly isRead: boolean) {

  }

  get formattedText(): string {
    const isLong: boolean = this.subtitle.length > 36;
    return isLong ? `${this.subtitle.substring(0, 32)}...` : this.subtitle;
  }

  static first(): Notification {
    return new Notification(
      'Notification 1',
      'Subtitle for notification 1',
      '4.00 PM',
      false,
    );
  }

  static second(): Notification {
    return new Notification(
      'Notification 2',
      'Subtitle for notification 2',
      '5.00 PM',
      false,
    );
  }

  static third(): Notification {
    return new Notification(
      'Notification 3',
      'Subtitle for notification 3',
      '6.00 PM',
      true,
    );
  }

  static fourth(): Notification {
    return new Notification(
      'Notification 4',
      'Subtitle for notification 4',
      '6.00 PM',
      true,
    );
  }
}

