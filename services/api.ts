import { Alert } from "react-native";

export const foreCastEnpoint = (apiKey: string, cityName: string) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=6&aqi=no&alerts=no`;

export const locationEndPoint = (apiKey: string, cityName: string) =>
  `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${cityName}`;

export const getApiService = async (endpoint: string) => {
  try {
    const response = await fetch(endpoint);
    const json = await response.json();
    if (!response.ok) {
      console.error(response);
      throw new Error("Failed to fetch resources");
    }
    return json;
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message);
    }
    console.error(error);
  }
};
