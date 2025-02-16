import { LogLevel, NotificationClickEvent, OneSignal } from "react-native-onesignal";
import Constants from "expo-constants";
import { router } from "expo-router";

export const initOneSignal = async () => {
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  OneSignal.initialize(Constants?.expoConfig?.extra?.oneSignalAppId);

  // Also need enable notifications to complete OneSignal setup
  OneSignal.Notifications.requestPermission(true);
};

export const handler = (event: NotificationClickEvent) => {
  const data: any = event.notification.additionalData;
  const history = data ? data["history"] : null;

  if (history) {
    router.push(history);
  }
  console.log("OneSignal: notification clicked:", event);
};
