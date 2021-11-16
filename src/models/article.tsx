import {ImageSourcePropType} from 'react-native';

export class Article {
  constructor(
    readonly title: string,
    readonly description: string,
    readonly website: string,
    readonly image: ImageSourcePropType,
    readonly date: string,
    readonly author?: Profile,
    readonly likes?: Like[],
    readonly comments?: Comment[],
  ) {}

  static three(): Article {
    return new Article(
      'Why It’s Important to Care for Your Mental Health.',
      'Mental-Health',
      'https://blog.doctorondemand.com/why-its-important-to-care-for-your-mental-health-834c8670b889?gi=c14df33b9497',
      {uri: 'https://miro.medium.com/max/1400/1*4FRigVMMDJ0aEHFyYKqw7w.jpeg'},
      'Date',
      /*Profile.markVolter(),
      [
        Like.byMarkVolter(),
        Like.byHubertFranck(),
      ],
      [
        Comment.byHubertFranck(),
        Comment.byHubertFranck(),
        Comment.byHubertFranck(),
      ],*/
    );
  }

  static four(): Article {
    return new Article(
      'Benefits of Good Mental Health.',
      'Mental-Health',
      'https://toronto.cmha.ca/documents/benefits-of-good-mental-health/',
      {
        uri:
          'https://images.pexels.com/photos/774866/pexels-photo-774866.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      },
      'Date',
      /*Profile.markVolter(),
      [
        Like.byMarkVolter(),
        Like.byHubertFranck(),
      ],
      [
        Comment.byHubertFranck(),
        Comment.byHubertFranck(),
        Comment.byHubertFranck(),
      ],*/
    );
  }

  static one(): Article {
    return new Article(
      'Mental-Health Challenges Students Face in College.',
      'Mental-Health',
      'https://www.bestcolleges.com/resources/top-5-mental-health-problems-facing-college-students/',
      {
        uri:
          'https://res.cloudinary.com/highereducation/image/upload/f_auto,fl_lossy,q_auto/v1/BestColleges.com/Mental_Health.jpg',
      },
      'Date',
      /*Profile.hubertFranck(),
      [
        Like.byMarkVolter(),
        Like.byHubertFranck(),
      ],
      [
        Comment.byHubertFranck(),
        Comment.byHubertFranck(),
        Comment.byHubertFranck(),
      ],*/
    );
  }

  static two(): Article {
    return new Article(
      'Building Better Mental Health.',
      'Mental-Health',
      'https://www.helpguide.org/articles/mental-health/building-better-mental-health.htm',
      {
        uri:
          'https://www.helpguide.org/wp-content/uploads/hands-putting-together-puzzle-head-1536.jpg',
      },
      'Date',
      /*Profile.markVolter(),
      [
        Like.byMarkVolter(),
        Like.byHubertFranck(),
      ],
      [
        Comment.byHubertFranck(),
        Comment.byHubertFranck(),
        Comment.byHubertFranck(),
      ],*/
    );
  }
}

export class Like {
  constructor(readonly author: Profile) {}

  static byMarkVolter(): Like {
    return new Like(Profile.markVolter());
  }

  static byHubertFranck(): Like {
    return new Like(Profile.hubertFranck());
  }
}

export class Comment {
  constructor(
    readonly text: string,
    readonly date: string,
    readonly author: Profile,
    readonly comments: Comment[],
    readonly likes: Like[],
  ) {}

  static byHubertFranck(): Comment {
    return new Comment(
      'This very useful information for me Thanks for your article!',
      'Today 11:10 am',
      Profile.hubertFranck(),
      [Comment.byMarkVolter()],
      [Like.byMarkVolter()],
    );
  }

  static byMarkVolter(): Comment {
    return new Comment(
      'Thanks!',
      'Today 11:10 am',
      Profile.hubertFranck(),
      [],
      [],
    );
  }
}

export class Profile {
  constructor(
    readonly firstName: string,
    readonly lastName: string,
    readonly photo: ImageSourcePropType,
  ) {}

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  static markVolter(): Profile {
    return new Profile(
      'Mark',
      'Volter',
      require('../assets/images/image-app-icon.png'),
    );
  }

  static hubertFranck(): Profile {
    return new Profile(
      'Hubert',
      'Franck',
      require('../assets/images/image-app-icon.png'),
    );
  }
}
