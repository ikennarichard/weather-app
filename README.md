# 🌦️ Weather App

## 🚀 Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Demo](#demo)
- [Setup](#setup)
- [Usage](#usage)
- [Project Status](#project-status)
- [Room for Improvement](#room-for-improvement)
- [Acknowledgements](#acknowledgements)
- [Authors](#authors)
- [License](#license)
- [What I Learned](#what-i-learned)

## General Information

This is a React Native app that provides real-time weather updates, notifications, and a sleek UI to keep you informed about weather forecast anytime, anywhere.

## Technologies Used

- React Native & Expo.
- OneSignal for push notifications.
- NativeWind.
- Async storage.
- SQLite.

## Features

- Real-time weather updates
- Push notifications for weather alerts

## Demo

- video demo

https://github.com/user-attachments/assets/20b7464e-ed6f-48f2-be2a-527531988fb8


## Setup

Get started in just a few steps!

1. Clone the repository:

```sh
  git clone https://github.com/ikennarichard/weather-app.git
```

2. Navigate to the project folder:

```sh
  cd weather-app
```

3. Install dependencies:

```sh
  npm install
```

4. Start the development server:

  You can use an emulator with:
  ```sh
  npm run android # or `npm run ios`
  ```

  Or start the development server with:
  ```sh
    npm start
  ```

### Environment Variables

  ```sh
  EXPO_PUBLIC_WEATHER_API_KEY=
  EXPO_PUBLIC_ONESIGNAL_APP_ID=
  EXPO_PUBLIC_ONESIGNAL_API_KEY=
  ```

## Usage

Simply open the app to see your current weather conditions and receive timely updates.

## Project Status

🚧 Project is: **In Progress** – New features coming soon!

## Room for Improvement

- Implement **location-based weather updates** using device GPS.
- Add **unit conversions** (°C ↔ °F).
- Enable **offline mode** using cached data.

## Acknowledgements

Shoutout to:

- [Mensa Philosophical Circle](https://www.mpcircle.org)
- The React Native & Expo community
- OneSignal

## Authors

- **[Ikenna Richard](https://ikennarichard.vercel.app)**

## License

This project is open source and available under the [MIT License](./LICENSE). Feel free to fork and contribute!

## What I Learned

### Notification Routing

OneSignal interacts with platform-specific notification services:

- **Apple Push Notification Service (APNs)** for iOS
- **Firebase Cloud Messaging (FCM)** for Android

These services wake up the user's device and deliver the message in real-time.

### Handling Notifications on the Client Side

When a push notification is received, the app decides whether to:

1. Display the notification as a system alert.
2. Perform an in-app action (e.g., navigate to the weather details screen).
