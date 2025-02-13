import { StatusBar } from "expo-status-bar";
import {
  Text,
  TextInput,
  View,
  Image,
  Pressable,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { weatherImages } from "@/constants/data";
import React from "react";
import { useWeatherContext } from "@/context/WeatherContext";

export default function Index() {
  const { setColorScheme, theme } = useWeatherContext();
  return (
    <SafeAreaView className="p-2 flex-col justify-center gap-10">
      <StatusBar style="auto" />
      <View className="flex-row items-center justify-around">
        {/* text input */}
        <TextInput
          className="px-3 rounded-3xl h-12 w-[80%] bg-gray-300"
          placeholder="Enter your location"
          onPress={Keyboard.dismiss}
        />
        <Pressable onPress={() => setColorScheme('dark')}>
          {theme == 'light' ? (
            <Feather name="sun" size={24} />
          ) : (
            <Feather name="moon" size={24} />
          )}
        </Pressable>
        {/* dark mode */}
      </View>

      <View className="flex-col gap-6">
        <MaterialIcons name="sunny" color="yellow" size={150} />
        <View>
          <Text>23&#176;</Text>
          <Text>Mostly Cloudy</Text>
        </View>

        <View className="flex-row justify-around w-full">
          <View>
            <Feather name="wind" size={20} />
            <Text>Value</Text>
          </View>
          <View>
            <Feather name="droplet" size={20} />
            <Text>Value</Text>
          </View>
          <View>
            <Feather name="sun" size={20} />
            <Text>Value</Text>
          </View>
        </View>
      </View>

      <View>
        <View className="flex-row gap-3">
          <Feather name="calendar" size={24} />
          <Text>Daily Forecast</Text>
        </View>
        <ScrollView
          horizontal
          contentContainerClassName="p-2 flex gap-4 w-full justify-around"
        >
          {[1, 2, 3].map((_, index) => (
            <View
              key={index}
              className="flex-col items-center bg-gray-200 rounded py-2 px-3"
            >
              <MaterialIcons name="sunny" color="yellow" size={50} />
              <Text>Day</Text>
              <Text>Degrees</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
