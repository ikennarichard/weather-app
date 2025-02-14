import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useColorScheme as useNWColorScheme } from "nativewind";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Location, WeatherDataProps } from "@/type";
import {
  foreCastEnpoint,
  getApiService,
  locationEndPoint,
} from "@/services/api";
import { WEATHER_API_KEY } from "@/constants/data";
type ColorScheme = "light" | "dark";

// Define the context properties
type WeatherProps = {
  theme: ColorScheme;
  toggleTheme: (theme: ColorScheme) => void;
  locations: Location[];
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  handleGetWeather: (value: string) => void;
  handleSearchLocations: (value: string) => void;
  weather: WeatherDataProps;
};

const WeatherContext = createContext<WeatherProps | undefined>(undefined);

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeatherContext must be used within a WeatherProvider");
  }
  return context;
};

export default function WeatherProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme() as ColorScheme;
  const [theme, setTheme] = useState<ColorScheme>(systemColorScheme);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [weather, setWeather] = useState<WeatherDataProps>(
    {} as WeatherDataProps
  );
  const { setColorScheme } = useNWColorScheme();
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("theme");
        if (storedTheme) {
          setTheme(storedTheme as ColorScheme);
          setColorScheme(storedTheme as ColorScheme);
        } else {
          setTheme(systemColorScheme || "light");
          setColorScheme(systemColorScheme || "light");
        }
      } catch (error) {
        console.error("Error loading theme:", error);
      }
    };
    loadTheme();
  }, []);

  useEffect(() => {
    const getLastSearched = async () => {
      const name = await AsyncStorage.getItem("city");
      if (name) {
        handleGetWeather(name);
      }
    };
    getLastSearched();
  }, []);

  const handleGetWeather = async (loc: string) => {
    setLocations([]);
    const data = await getApiService(foreCastEnpoint(WEATHER_API_KEY, loc));
    setWeather(data);
    await AsyncStorage.setItem("city", loc);
  };

  const handleSearchLocations = async (value: string) => {
    if (value.length > 2) {
      const data = await getApiService(
        locationEndPoint(WEATHER_API_KEY, value)
      );
      setLocations(data);
    }
  };

  const toggleTheme = async (selectedTheme: ColorScheme) => {
    try {
      setTheme(selectedTheme);
      setColorScheme(selectedTheme);
      await AsyncStorage.setItem("theme", selectedTheme);
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        theme,
        toggleTheme,
        locations,
        searchTerm,
        setSearchTerm,
        handleGetWeather,
        weather,
        handleSearchLocations,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
