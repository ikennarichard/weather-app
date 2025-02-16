import { LogLevel, OneSignal } from "react-native-onesignal";
import Constants from "expo-constants";
import { router } from "expo-router";


export const initOneSignal = async () => {
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  OneSignal.initialize(Constants?.expoConfig?.extra?.oneSignalAppId);

  // Also need enable notifications to complete OneSignal setup
  OneSignal.Notifications.requestPermission(true);
};
