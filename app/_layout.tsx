import { Stack } from "expo-router";
import "../global.css";
import "react-native-reanimated";
import WeatherProvider from "@/context/WeatherContext";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <WeatherProvider>
      <StatusBar style="auto" />
      <Stack screenOptions={{
        headerShown: false

      }}/>
    </WeatherProvider>
  );
}
