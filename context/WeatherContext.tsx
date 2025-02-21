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
import { saveWeatherData } from "@/services/db";

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
  isMenuOpen: boolean;
  toggleMenu: () => void;
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
  const [searchTerm, setSearchTerm] = useState<string>("kano");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [weather, setWeather] = useState<WeatherDataProps>(
    {} as WeatherDataProps
  );
  const { setColorScheme } = useNWColorScheme();
  const [locations, setLocations] = useState<Location[]>([]);
  const [prevLocation, setPrevLocation] = useState<string | null>(null);

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
      const city = await AsyncStorage.getItem("city");
      if (city) {
        handleGetWeather(city);
      } else {
        handleGetWeather(searchTerm);
      }
    };
    getLastSearched();
  }, []);

  useEffect(() => {
    if (weather?.location?.name && weather?.location?.name !== prevLocation) {
      (async () => {
        await saveWeatherData(
          weather?.location?.name,
          weather?.location?.country,
          weather?.current?.temp_c,
          weather?.current?.condition?.text,
          weather?.current?.wind_kph,
          weather?.current?.humidity,
          new Date().toISOString()
        );
        setPrevLocation(weather?.location?.name); // Update previous location
      })();
    }
  }, [weather]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleGetWeather = async (loc: string) => {
    setLocations([]);
    const data = await getApiService(foreCastEnpoint(loc));
    setWeather(data);
    await AsyncStorage.setItem("city", loc);
  };

  const handleSearchLocations = async (value: string) => {
    if (value.length >= 2) {
      const data = await getApiService(
        locationEndPoint(value)
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
        locations,
        searchTerm,
        weather,
        isMenuOpen,
        toggleMenu,
        toggleTheme,
        setSearchTerm,
        handleGetWeather,
        handleSearchLocations,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
