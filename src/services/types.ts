import { UtilService } from "./util.service";

export const USERS = {
  DATABASE: {
    REF: 'users'
  }
}

export const ACTION_CARDS = {
  DATABASE: {
    REF: 'action_cards',
    FIELDS: {
      DATE: 'date',
      TITLE: 'title',
      REACTS: {
        TYPE: 'type',
        USER: 'user'
      }
    }
  },
  REACTS: {
    LIKE: 'like',
    HEART: 'heart'
  }
}

export const EMOTIVITY = {
    DATABASE: {
        REF: 'mood_tracking',
        FIELDS: {
            DATE: 'date',
            USER: 'user',
            ANGER: 'anger',
            ANXIETY: 'anxiety',
            HAPPINESS: 'happiness',
            SADNESS: 'sadness',
            STRESS: 'stress',
            TIRED: 'tired'
        }
    },
    //TODO this section and Tired -> Tiredness
    ANGER: {
      LABEL: 'anger',
      MIN: 'None',
      MAX: 'Furious' 
    },
    HAPPINESS: {
      LABEL: 'happiness',
      MIN: 'None',
      MAX: 'Happy' 
    }
}

export const DIARY = {
  DATABASE: {
    REF: 'diary_entries',
    FIELDS: {
      DATE: 'date',
      CONVERSATIONS: 'conversations',
      CONVERSATION: {
        QUESTION: 'question',
        ANSWER: 'answer'
      },
      STATUS: 'status',
      USER: 'user',
    },
    QUESTIONS: {
      Q1: 'What went well for you this week?',
      Q2: 'Where did this happen?',
      Q3: 'Why did it go well?',
      Q4: 'How did it make you feel?'
    },
    STATUS: {
      COMPLETE: 'Complete',
      INCOMPLETE: 'Incomplete'
    }
  }
}

export const THANKS = {
  DATABASE: {
    REF: 'say_thanks',
    FIELDS: {
      DATE: 'date',
      CONVERSATIONS: 'conversations',
      CONVERSATION: {
        QUESTION: 'question',
        ANSWER: 'answer'
      },
      STATUS: 'status',
      USER: 'user',
    },
    QUESTIONS: {
      Q1: 'What are the things that you are thankful for today?'
    },
    STATUS: {
      COMPLETE: 'Complete',
      INCOMPLETE: 'Incomplete'
    }
  }
}

export const DATE = {
    FORMATS: {
        DB_UNIX: '',
        DEFAULT: 'Do MMMM YYYY',
        DB: 'MM/DD/YYYY'
    }
}

export const MOOD_SLIDES = [
    {
      key: EMOTIVITY.DATABASE.FIELDS.HAPPINESS,
      title: 'Happiness',
      text: 'How happy are you today?',
      image: require('../assets/images/happy.png'),
      type: 'positive',
      labels: {
        min: 'None',
        max: 'Happy'
      }
    },
    {
      key: EMOTIVITY.DATABASE.FIELDS.ANGER,
      title: 'Anger',
      text: 'How angry are you today?',
      image: require('../assets/images/angry.png'),
      type: 'negative',
      labels: {
        min: 'None',
        max: 'Furious'
      }
    },
    {
      key: EMOTIVITY.DATABASE.FIELDS.ANXIETY,
      title: 'Anxiety',
      text: 'How anxious are you today?',
      image: require('../assets/images/anxiety.png'),
      type: 'negative',
      labels: {
        min: 'None',
        max: 'Overwhelmed'
      }
    },
    {
      key: EMOTIVITY.DATABASE.FIELDS.SADNESS,
      title: 'Sadness',
      text: 'How sad are you today?',
      image: require('../assets/images/cry.png'),
      type: 'negative',
      labels: {
        min: 'None',
        max: 'Devastated'
      }
    },
    {
      key: EMOTIVITY.DATABASE.FIELDS.STRESS,
      title: 'Stress',
      text: 'How stressed are you today?',
      image: require('../assets/images/stress.png'),
      type: 'negative',
      labels: {
        min: 'None',
        max: 'Intense'
      }
    },
    {
      key: EMOTIVITY.DATABASE.FIELDS.TIRED,
      title: 'Tiredness',
      text: 'How tired are you today?',
      image: require('../assets/images/tired.png'),
      type: 'negative',
      labels: {
        min: 'None',
        max: 'Exhausted'
      }
    }
];