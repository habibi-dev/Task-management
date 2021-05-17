import PushNotification from 'react-native-push-notification';

export const NotificationSend = (title, message, subText, color) => {
    PushNotification.localNotification({
        /* Android Only Properties */
        channelId: 'main', // (required) channelId, if the channel doesn't exist, notification will not trigger.
        ticker: title, // (optional)
        message: message,
        subText: subText, // (optional) default: none
        color: color, // (optional) default: system default
        vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        priority: 'high', // (optional) set notification priority, default: high
        visibility: 'private', // (optional) set notification visibility, default: private
    });
};
