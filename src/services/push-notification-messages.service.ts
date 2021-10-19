
export class PushNotificationMessages {
  constructor() {}

  static getEmotivityDailyReminderText = () => {
    const notificationTexts = [
      'Remember to track your mood before the day ends',
      'Remember to track your mood today',
      'Your mood tracker is ready to be completed',
      'Still time to track your mood today',
      'Haven’t tracked your mood yet? There’s still time!',
    ];
    const randomlySelectedText =
      notificationTexts[Math.floor(Math.random() * 5)];
    return randomlySelectedText;
  };

  static getEmotivityNotTrackedText = () => {
    const notificationTexts = [
      'We notice you haven’t tracked your mood for a while. Regular tracking can help you understand your emotions',
      'Haven’t tracked your mood for a while? Regular tracking can help your mental wellbeing',
      'Tracking your mood can help you work out what makes you feel good',
      'Tracking your feelings can help you spot patterns and make positive changes',
      'Understanding your feelings is important – eMotivity is waiting for you!!',
    ];
    const randomlySelectedText =
      notificationTexts[Math.floor(Math.random() * 5)];
    return randomlySelectedText;
  };

  static getSayThanxDailyReminderText = () => {
    const notificationTexts = [
      'There’s still time to say thanx today',
      'Remember to say thanx before the day is out',
      'Remember to say thanx',
      'Haven’t said thanx yet today? There’s still time!',
      'Say thanx is ready for completion!!',
    ];
    const randomlySelectedText =
      notificationTexts[Math.floor(Math.random() * 5)];
    return randomlySelectedText;
  };

  static getSayThanxNotTrackedText = () => {
    const notificationTexts = [
      'You’re more than half way to your daily steps. Remember physical activity can really help your wellbeing',
      'You’re doing well with your steps – physical activity is key to looking after yourself',
      'Something to say thanx about today?',
      'How about saying thanx today?  It can help your wellbeing',
      'Regularly saying thanx can boost your mood',
    ];
    const randomlySelectedText =
      notificationTexts[Math.floor(Math.random() * 5)];
    return randomlySelectedText;
  };

  static getTraxivityFullAchivementText = () => {
    const notificationTexts = [
      'Smashed your steps today! Well done!',
      'Fantastic performance today! Steps achieved!',
      'Wow, you’ve reached your step goal!',
      'Steps achieved! Give yourself a hug!',
      'You’ve achieved your steps today! Great performance!',
      'Step count achieved! Light up the fireworks; time to celebrate!',
      'Step count achieved - keep up the good work!',
      'Step count complete! Well done! You made it!',
      'Steps achieved! Keep it up!',
      "Step count goal achieved! Let's go for it again tomorrow!",
      'Bravo! Step count achieved! Be proud of yourself!',
      'Woo hoo, you did it! Steps achieved!',
      'Good going today! Steps achieved!',
      'Steps achieved!',
      'Steps achieved! An excellent day - be proud!',
      'Well done you! Steps complete!',
      'Hip Hip Hooray! Step count complete for today!',
    ];
    const randomlySelectedText =
      notificationTexts[Math.floor(Math.random() * 17)];
    return randomlySelectedText;
  };

  static getTraxivityHighAchivementText = () => {
    const notificationTexts = [
      'Great work – you’re almost at your step goal!',
      'You’re doing great – you’re close to your step goal!',
      'You’re doing awesome with your steps! You’re nearly at your goal!',
      'Excellent effort – step goal almost achieved!',
      'Excellent performance with your steps! You’re within sight of your goal',
      "Well done, you're doing great with your step-count!",
      'Wow, high flyer! You’re very close to your step goal',
      'Be proud of your achievement – you’re nearly at your step goal!',
    ];
    const randomlySelectedText =
      notificationTexts[Math.floor(Math.random() * 8)];
    return randomlySelectedText;
  };

  static getTraxivityMediumAchivementText = () => {
    const notificationTexts = [
      'Great work – you’re almost at your step goal!',
      'You’re doing great – you’re close to your step goal!',
      'You’re making good progress with your steps. Avoiding lifts and escalators is a great way to be more physically active',
      'You’re more than half way to your step goal. Taking the stairs instead of the lift can really help to reach that goal',
      'You’re doing well with your steps. Parking further away or getting off the bus early is also a great way to increase your steps',
      'You’re making good progress with your steps. It’s important to keep moving!',
      'You’re doing well with your steps. Physical activity is good for your health and wellbeing ',
      'You’re making good progress with your steps. You can also work towards your step-count goal by walking 10-minutes at a time regularly.',
    ];
    const randomlySelectedText =
      notificationTexts[Math.floor(Math.random() * 8)];
    return randomlySelectedText;
  };

  static getTraxivityLowAchivementText = () => {
    const notificationTexts = [
      'Physical activity should be fun - can you find something fun and active to do?',
      'Form a good habit! Try to fit physical activity into your daily routine ',
      "Don't email or telephone if you can walk & talk instead",
      'Remember, every step counts! Being active for 10-minutes at a time is a great way to keep active',
      'Take every chance you get to be more active',
      'Change starts with you! Can you look for opportunities to be more active?',
      'Find more time to be active – sit less move more!',
      'Keep moving – it’s good for your physical and mental wellbeing',
      'Taking the stairs instead of the lift is a great way to be more active',
      'Can you fit a few more steps in? Parking further away or getting off the bus early is a great way to be more active',
    ];
    const randomlySelectedText =
      notificationTexts[Math.floor(Math.random() * 10)];
    return randomlySelectedText;
  };
}
