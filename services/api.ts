import { ForecastProps } from "@/types";
import { Alert } from "react-native";

export const fetchForeCast = async ({ apiKey, cityName }: ForecastProps) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=6&aqi=no&alerts=no`
    );

    if (!response.ok) {
      console.error(response);
      throw new Error("Failed to fetch resources");
    }
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message);
      console.error(error);
    }
    throw error;
  }
};
