import PushNotification from 'react-native-push-notification';

export const NotificationSend = (id, title, message, subText, color, item) => {
    PushNotification.localNotification({
        /* Android Only Properties */
        channelId: 'main', // (required) channelId, if the channel doesn't exist, notification will not trigger.
        title, // (optional)
        message,
        id,
        subText: subText, // (optional) default: none
        color, // (optional) default: system default
        data: item,
        vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        priority: 'high', // (optional) set notification priority, default: high
        visibility: 'private', // (optional) set notification visibility, default: private
    });
};
