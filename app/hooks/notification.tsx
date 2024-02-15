import { PermissionsAndroid, Platform } from "react-native"
import messaging from '@react-native-firebase/messaging';

const notification = () => {
    const requestUserPermission = async () => {
        if(Platform.OS === 'android') {
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            );

        console.log('Notification permission granted.');
        }
    }

    const getFCMToken = async () => {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            console.log(fcmToken);
        } else {
            console.log('Failed', 'No token received');
        }
    }

    const listenToForegroundNotifications = async () => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('A new message arrived! (FOREGROUND)', JSON.stringify(remoteMessage));
        });
        return unsubscribe
    };

    const listenToBackgroundNotifications = async () => {
        const unsubscribe = messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('A new message arrived! (BACKGROUND)', JSON.stringify(remoteMessage));
        });
        return unsubscribe
    };

    return {
        requestUserPermission,
        getFCMToken,
        listenToForegroundNotifications,
        listenToBackgroundNotifications
    };
};

export default notification;