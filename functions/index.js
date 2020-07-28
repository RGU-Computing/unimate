const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const messages = {
    anger: [
        'Anger 1',
        'Anger 2'
    ],
    anxiety: [
        'Anxiety 1',
        'Anxiety 2'
    ],
    sadness: [
        'Sad 1',
        'Sad 2'
    ],
    stress: [
        'Stress 1',
        'Stress 2',
    ],
    tired: [
        'Tired 1',
        'Tired 2'
    ]
};

exports.sendNotification = functions.firestore.document('mood_tracking/{documentId}').onCreate((snap, context) => {
  
    console.log(snap.data());
    console.log(context.params.documentId);

    //Analyze the mood scores
    //const negative = parseInt(snap.data().anger) + parseInt(snap.data().anxiety) + parseInt(snap.data().sadness) + parseInt(snap.data().stress) + parseInt(snap.data().tired)
    //const positive = parseInt(snap.data().happiness);

    const negatives = [];

    if (parseInt(snap.data().anger) > 2) {
        negatives.push('anger')
    }

    if (parseInt(snap.data().anxiety) > 2) {
        negatives.push('anxiety')
    }

    if (parseInt(snap.data().sadness) > 2) {
        negatives.push('sadness')
    }

    if (parseInt(snap.data().stress) > 2) {
        negatives.push('stress')
    }

    if (parseInt(snap.data().tired) > 2) {
        negatives.push('tired')
    }

    //send the notification
    /*negatives.forEach(item => {
        admin.firestore().collection('users').doc(snap.data().user).update({
            notifications: admin.firestore.FieldValue.arrayUnion({
                isImportant: true,
                subtitle: messages[item][Math.floor(Math.random() * items.length)],
                timestamp: Date.now(),
                title: "Emotivity: Mood Tracking",
                type: "Emotivity"
            })
        });
    });*/
    
    /*firebase.database().ref('messages').child(event.params.messageID).once('value').then(function(snap) {
        var messageData = snap.val();
    
        var topic = 'notifications_' + messageData.receiverKey;
        var payload = {
            notification: {
            title: "You got a new Message",
            body: messageData.content,
            }
        };
        
        admin.messaging().sendToTopic(topic, payload)
            .then(function(response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function(error) {
                console.log("Error sending message:", error);
            });
        });*/
});