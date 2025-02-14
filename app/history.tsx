import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, Pressable } from "react-native";
import { getWeatherHistory, clearWeatherHistory } from "../services/db";
import { WeatherHistoryProps } from "../type";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WeatherHistoryScreen() {
  const [history, setHistory] = useState<WeatherHistoryProps[]>([]);

  useEffect(() => {
    (async () => {
      await loadHistory();
    })();
  }, []);

  const loadHistory = async () => {
    const data = await getWeatherHistory();
    setHistory(data);
  };

  return (
    <SafeAreaView className="flex-1 p-5">
      <Pressable
        onPress={async () => {
          await clearWeatherHistory();
          await loadHistory();
        }}
      >
        <Text className="bg-gray-700 w-28 text-white rounded-lg py-2 px-1">Clear History</Text>
      </Pressable>
      <FlatList
      className="mt-3"
        data={history}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <Text>{`${item.city}, ${item.country}: ${item.temperature}°C - ${item.condition} (${item.date})`}</Text>
        )}
      />
    </SafeAreaView>
  );
}
