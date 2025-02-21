const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

export const foreCastEnpoint = (cityName: string) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=6&aqi=no&alerts=no`;

export const locationEndPoint = (cityName: string) =>
  `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${cityName}`;

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
      console.error(error.message);
    }
    console.error(error);
    return;
  }
};
