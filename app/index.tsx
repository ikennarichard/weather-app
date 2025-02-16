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
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import { useWeatherContext } from "@/context/WeatherContext";
import { useEffect } from "react";
import { OneSignal } from "react-native-onesignal";
import { weatherColors } from "@/constants/Colors";
import { weatherIcons } from "@/constants/data";
import { formatTime } from "@/utils/formatTime";
import { getDayFromDate } from "@/utils/getDayName";
import Animated from "react-native-reanimated";
import { setupDatabase } from "@/services/db";
import { Link } from "expo-router";
import { initOneSignal, handler } from "@/utils/onesignal";

export default function Index() {
  const {
    theme,
    isMenuOpen,
    locations,
    weather,
    toggleTheme,
    handleSearchLocations,
    handleGetWeather,
    toggleMenu,
  } = useWeatherContext();
  const { current, location } = weather;
  const [isCelcius, setIsCelcius] = useState(true)
  const isDarkMode = theme === "dark";

  useEffect(() => {
    (async () => {
      await setupDatabase();
      await initOneSignal();
    })();

    OneSignal.Notifications.addEventListener("click", handler);

    return () => {
      OneSignal.Notifications.removeEventListener("click", handler);
    };
  }, []);

  return (
    <SafeAreaView
      className={`py-6 px-3 flex-col flex-1 gap-9 ${
        isDarkMode ? "bg-gray-600" : "bg-slate-100"
      }`}
    >
      <StatusBar style="auto" />


      <Pressable onPress={toggleMenu}>
        <MaterialIcons
          name="menu"
          size={24}
          color={isDarkMode ? "white" : "black"}
        />
      </Pressable>

      {/* menu items */}
      <View
        className={`transition-transform duration-150 ease-linear absolute top-24 left-3 z-10 px-2 py-6 flex-col gap-3 rounded-lg w-32 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-[100vh]"
        } ${isDarkMode ? "bg-slate-200" : "bg-slate-300"}`}
      >
        <Link
          href="/history"
         className="underline"
        >
          View History
        </Link>
        <Pressable className="bg-gray-500 rounded-lg p-2" onPress={() => setIsCelcius(!isCelcius)}>
          <Text className="text-white">{isCelcius ? 'Convert to Fahrenheit' : 'Convert to Celcius'}</Text>
        </Pressable>
      </View>


      <KeyboardAvoidingView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-row items-center justify-around">
            {/* text input */}
            <TextInput
              className={`px-6 rounded-3xl h-12 w-[80%] border border-gray-300 ${
                isDarkMode ? "placeholder:text-white" : null
              }`}
              placeholder="Enter your location"
              secureTextEntry={false}
              onChangeText={handleSearchLocations}
              style={{ color: isDarkMode ? "white" : "black" }}
            />
            <Pressable
              onPress={() => toggleTheme(theme === "dark" ? "light" : "dark")}
            >
              {!isDarkMode ? (
                <Feather name="moon" size={24} />
              ) : (
                <Feather name="sun" size={24} color="white" />
              )}
            </Pressable>
          </View>
        </TouchableWithoutFeedback>

        {locations?.length > 0 ? (
          <View className="flex-col gap-3 rounded-xl absolute overflow-hidden top-16 left-3 p-3 z-10 bg-gray-200 w-10/12">
            {locations?.map((item, index) => (
              <Pressable
                key={index}
                className="flex-row gap-3"
                onPress={() => handleGetWeather(item.name)}
              >
                <View
                  className={` border-gray-300 w-[90%] pb-1 flex-row gap-3 items-center ${
                    index === locations.length - 1 ? "border-none" : "border-b"
                  }`}
                >
                  <FontAwesome name="location-arrow" size={16} />
                  <Text>
                    {item.name}, {item.country}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        ) : null}
      </KeyboardAvoidingView>

      <View className="flex-col gap-6 items-center relative z-0">
        <Text
          className="text-4xl font-semibold  overflow-hidden text-ellipsis"
          style={{ color: `${isDarkMode ? "white" : null}` }}
        >
          {location?.name}, {location?.country}
        </Text>
        <MaterialCommunityIcons
          name={weatherIcons[current?.condition?.text?.trim()]}
          color={weatherColors[current?.condition?.text] || "#999"}
          size={150}
        />
        <View className="flex-col items-center">
          <Text
            className="text-4xl font-semibold"
            style={{ color: `${isDarkMode ? "white" : null}` }}
          >
            {isCelcius ? current?.temp_c : current?.temp_f}&#176;
            <Text>{isCelcius ? 'C' : 'F'}</Text>
          </Text>
          <Text style={{ color: `${isDarkMode ? "white" : null}` }}>
            {current?.condition?.text}
          </Text>
        </View>

        <View className="flex-row justify-around w-full items-baseline">
          <View className="flex-col items-center">
            <Feather
              name="wind"
              size={20}
              color={`${isDarkMode ? "white" : null}`}
            />
            <Text style={{ color: `${isDarkMode ? "white" : null}` }}>
              {current?.wind_kph}km
            </Text>
          </View>
          <View className="flex-col items-center">
            <Feather
              name="droplet"
              size={20}
              color={`${isDarkMode ? "white" : null}`}
            />
            <Text style={{ color: `${isDarkMode ? "white" : null}` }}>
              {current?.humidity}%
            </Text>
          </View>
          <View className="flex-col items-center">
            <Feather
              name="clock"
              size={20}
              color={`${isDarkMode ? "white" : null}`}
            />
            <Text style={{ color: `${isDarkMode ? "white" : null}` }}>
              {location?.localtime ? formatTime(location?.localtime) : 0}
            </Text>
          </View>
        </View>
      </View>

      <View>
        <View className="flex-row gap-3 mb-5">
          <Feather
            name="calendar"
            size={24}
            color={`${isDarkMode ? "white" : null}`}
          />
          <Text style={{ color: `${isDarkMode ? "white" : null}` }}>
            Daily Forecast
          </Text>
        </View>
        <Animated.ScrollView
          horizontal
          contentContainerStyle={{ gap: 10 }}
          showsHorizontalScrollIndicator={false}
        >
          {weather?.forecast?.forecastday?.map((item, index) => (
            <View
              key={index}
              className={`flex-col items-center rounded-lg p-6 ${
                isDarkMode ? "bg-slate-200/20" : "bg-slate-200/60"
              }`}
            >
              <MaterialCommunityIcons
                name={weatherIcons[item?.day?.condition?.text]}
                color={weatherColors[item?.day?.condition?.text] || "#333"}
                size={30}
              />

              <Text style={{ color: `${isDarkMode ? "white" : null}` }}>
                {item?.date ? getDayFromDate(item?.date) : ""}
              </Text>
              <Text style={{ color: `${isDarkMode ? "white" : null}` }}>
                {isCelcius ? item?.day?.avgtemp_c : item?.day?.avgtemp_f}&#176;
                <Text>{isCelcius ? 'C' : 'F'}</Text>
              </Text>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
}
