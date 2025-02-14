import { Stack } from "expo-router";
import "../global.css";
import "react-native-reanimated";
import WeatherProvider from "@/context/WeatherContext";

export default function RootLayout() {
  return (
    <WeatherProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="history" />
      </Stack>
    </WeatherProvider>
  );
}
