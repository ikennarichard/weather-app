import { LogLevel, NotificationClickEvent, OneSignal } from "react-native-onesignal";
import { router } from "expo-router";

export const initOneSignal = async () => {
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  OneSignal.initialize(`${process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID}`);

  console.log(process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID)
  OneSignal.Notifications.requestPermission(true);
};

export const sendPushNotification = async () => {
  const response = await fetch('https://api.onesignal.com/notifications?c=push', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization: `Key ${process.env.EXPO_PUBLIC_ONESIGNAL_API_KEY}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      app_id: `${process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID}`,
      contents: {
        en: 'Check out your recent history.',
        
      },
      headings: {en: 'MPC'},
      name: 'History',
      data: {
        "history": "/history" 
      },
      included_segments: ['Active Subscriptions', 'Total Subscriptions'],
    })
  })
  const json = await response.json();
  console.log(json)
}

export const handler = (event: NotificationClickEvent) => {
  const data: any = event.notification.additionalData;
  const history = data ? data["history"] : null;

  if (history) {
    router.push(history);
  }
  console.log("OneSignal: notification clicked:", event);
  return;
};
