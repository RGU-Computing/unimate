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
            Q1: 'What Happended?',
            Q2: 'Location:',
            Q3: 'Your thoughts at the time:',
            Q4: 'What were your thoughts after reflecting and how did you feel after that? '
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