# Building a Weather App with React Native Expo: A First-Principles Journey

In this article, I’ll walk you through the process of setting up a Weather application with React native Expo.

Mobile apps are more relevant today than ever before, they are also a big driver of user engagement. This weather app dives into building a mobile application with our favorite React library, it gets real-time weather updates from [WeatherAPI.com](https://www.weatherapi.com) and also intergrates **Onesignal** for push notification.

## The Core Technologies

- **React Native with Expo:** A rapid development platform for cross-platform apps.
- **OneSignal:** A robust solution for handling push notifications without needing to manage the complexities of APNs (iOS) or FCM (Android) directly.
- **NativeWind:** A styling library that brings the utility-first benefits of Tailwind CSS to React Native, enabling clean and expressive UI code.
- **Async Storage** for saving user preferences, such as last searched city.

## Setting Up Your React Native Expo Project

Before integrating any services, you first need to set up a new Expo project. Follow these steps:

1. **Create a New Project:**  
   Open your terminal and run the following command to create a new Expo project:
   ```bash
   npx create-expo-app@latest my-weather-app
   ```
   This command scaffolds a new project named `my-weather-app`.

2. **Navigate to the Project Folder:**
   ```bash
   cd my-weather-app
   ```

3. **Start the Development Server:**  
   Launch your Expo development server:
   ```bash
   npx expo start
   ```
   This opens the Metro bundler and provides a QR code for testing on a physical device via Expo Go.

For more details on setting up a new Expo project, refer to the [Expo documentation](https://docs.expo.dev/get-started/create-a-project/)

## Integrating OneSignal in an Expo Project

### Step 1: Installation

Start by installing the OneSignal Expo plugin and the OneSignal React Native SDK:

```bash
npx expo install onesignal-expo-plugin
npm install --save react-native-onesignal
```

### Step 2: Configuring Expo

Modify your `app.json` or `app.config.js` to include the OneSignal plugin and your OneSignal App ID:

```json
{
  "plugins": [
    [
      "onesignal-expo-plugin",
      { "mode": "development" }
    ]
  ],
  "extra": {
    "oneSignalAppId": "YOUR-ONESIGNAL-APP-ID"
  }
}
```

### Step 3: Initializing OneSignal in Your App

Within your main application file (e.g., `App.js`), initialize OneSignal:

```js
  import OneSignal, { LogLevel } from 'react-native-onesignal';
  import Constants from 'expo-constants';

  // Enable verbose logging (optional)
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // Initialize OneSignal with your app ID from Expo constants
  OneSignal.initialize(Constants.expoConfig.extra.oneSignalAppId);

  // Request push notification permissions
  OneSignal.Notifications.requestPermission(true);
```

This concise setup handles device registration and permission prompting, laying the groundwork for sending notifications.

*For further details, refer to the [OneSignal Expo Plugin documentation](https://documentation.onesignal.com/docs/react-native-expo-sdk-setup).*

### Step 4: Prebuild and Run

Generate the native directories and launch your project:

```bash
npx expo prebuild
npx expo run:android  # or npx expo run:ios
```

## Persisting User Preferences with Async Storage

To enhance user experience, I used [Async Storage](https://react-native-async-storage.github.io/async-storage/) to persist theme settings:

1. **Installation:**

   ```bash
   npx expo install @react-native-async-storage/async-storage
   ```

2. **Saving Preferences:**

   When the user searches a city, store their preference:

   ```javascript
   import AsyncStorage from '@react-native-async-storage/async-storage';

   const saveLastSearchedcity = async (city) => {
     try {
       await AsyncStorage.setItem('city', city);
     } catch (e) {
       console.error('Failed to save city.', e);
     }
   };
   ```

## Conclusion

Building this weather app was about understanding the underlying technologies of a mobile application. By following these steps, you now have a solid foundation for a weather app that can be extended with more features in the future. With Expo handling cross-platform complexities, OneSignal managing notifications, and Async Storage preserving user preferences, you’re well on your way to building engaging mobile experiences.

*Happy coding, and may your notifications always reach your users in time!*