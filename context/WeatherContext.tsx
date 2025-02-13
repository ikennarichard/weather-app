import { createContext, ReactNode, useContext, useState } from "react";
import { useColorScheme } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { themes } from "@/constants/colors";

type WeatherProps = {
  theme: "light" | "dark" | undefined;
  setColorScheme: (scheme: "light" | "dark" | "system") => void;
};

type LocationProps = {};

const weatherContext = createContext({} as WeatherProps);

export const useWeatherContext = () => {
  return useContext(weatherContext);
};

export default function WeatherProvider({ children }: { children: ReactNode }) {
  const [locations, setLocations] = useState<LocationProps | null>([]);
  const { colorScheme, setColorScheme } = useColorScheme();

  const exported: WeatherProps = {
    theme: colorScheme,
    setColorScheme,
  };
  
  return (
    <weatherContext.Provider value={exported}>
      <SafeAreaView
        style={themes[colorScheme ?? "dark"]}
        className="bg-red-500"
      >
        {children}
      </SafeAreaView>
    </weatherContext.Provider>
  );
}
