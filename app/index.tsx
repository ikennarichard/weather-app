import { StatusBar } from "expo-status-bar";
import {
  Text,
  TextInput,
  View,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";
import { useWeatherContext } from "@/context/WeatherContext";
import { useEffect } from "react";
import { LogLevel, OneSignal } from "react-native-onesignal";
import { weatherColors } from "@/constants/Colors";
import { weatherIcons } from "@/constants/data";
import { formatTime } from "@/utils/formatTime";
import { getDayFromDate } from "@/utils/getDayName";
import Animated from "react-native-reanimated";
import { setupDatabase } from "@/services/db";
import { Link } from "expo-router";

export default function Index() {
  const {
    theme,
    toggleTheme,
    locations,
    handleSearchLocations,
    handleGetWeather,
    weather,
  } = useWeatherContext();
  const { current, location } = weather;

  useEffect(() => {
    //   // initialize one signal
    //   OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    //   OneSignal.initialize("3ce46b73-83b5-4f26-a712-c4a0cdef9554");

    //   // Also need enable notifications to complete OneSignal setup
    //   OneSignal.Notifications.requestPermission(true);
    (async () => {
      await setupDatabase();
    })();
  }, []);
  return (
    <SafeAreaView
      className={`py-6 px-3 flex-col flex-1 gap-12 ${
        theme === "dark" ? "bg-red-400" : "bg-slate-100"
      }`}
    >
      <StatusBar style="auto"/>
      <Link href='/history' className="underline text-blue-300">History</Link>
      <KeyboardAvoidingView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-row items-center justify-around">
            {/* text input */}
            <TextInput
              className="px-6 rounded-3xl h-12 w-[80%] border border-gray-300"
              placeholder="Enter your location"
              secureTextEntry={false}
              onChangeText={handleSearchLocations}
            />
            <Pressable
              onPress={() => toggleTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme == "light" ? (
                <Feather name="moon" size={24} />
              ) : (
                <Feather name="sun" size={24} color="white" />
              )}
            </Pressable>
          </View>
        </TouchableWithoutFeedback>

        {locations?.length > 0 ? (
          <View className="flex-col gap-3 rounded-xl absolute top-16 left-3 p-3 z-10 bg-gray-200 w-10/12">
            {locations?.map((item, index) => (
              <Pressable
                key={index}
                className="flex-row gap-3"
                onPress={() => handleGetWeather(item.name)}
              >
                <FontAwesome name="location-arrow" size={16} />
                <Text
                  className={` border-gray-300 pb-1 ${
                    index === locations.length - 1 ? "border-none" : "border-b"
                  }`}
                >
                  {item.name}, {item.country}
                </Text>
              </Pressable>
            ))}
          </View>
        ) : null}
      </KeyboardAvoidingView>

      <View className="flex-col gap-6 items-center relative z-0">
        <Text className="text-5xl font-semibold">
          {location?.name}, {location?.country}
        </Text>
        <MaterialCommunityIcons
          name={weatherIcons[current?.condition?.text]}
          color={weatherColors[current?.condition?.text]}
          size={150}
        />
        <View className="flex-col items-center">
          <Text className="text-4xl font-semibold">
            {current?.temp_c}&#176;
          </Text>
          <Text>{current?.condition?.text}</Text>
        </View>

        <View className="flex-row justify-around w-full items-baseline">
          <View className="flex-col items-center">
            <Feather name="wind" size={20} />
            <Text>{current?.wind_kph}km</Text>
          </View>
          <View className="flex-col items-center">
            <Feather name="droplet" size={20} />
            <Text>{current?.humidity}%</Text>
          </View>
          <View className="flex-col items-center">
            <Feather name="clock" size={20} />
            <Text>
              {location?.localtime ? formatTime(location?.localtime) : 0}
            </Text>
          </View>
        </View>
      </View>

      <View>
        <View className="flex-row gap-3">
          <Feather name="calendar" size={24} />
          <Text>Daily Forecast</Text>
        </View>
        <Animated.ScrollView
          horizontal
          contentContainerStyle={{ gap: 10 }}
          showsHorizontalScrollIndicator={false}
        >
          {weather?.forecast?.forecastday?.map((item, index) => (
            <View
              key={index}
              className="flex-col items-center rounded-lg p-6 bg-slate-200/50"
            >
              <MaterialCommunityIcons
                name={weatherIcons[item?.day?.condition?.text]}
                color={weatherColors[item?.day?.condition?.text]}
                size={30}
              />

              <Text>{item?.date ? getDayFromDate(item?.date) : ""}</Text>
              <Text>{item?.day?.avgtemp_c}&#176;</Text>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
}
