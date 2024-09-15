import { createContext, useContext, useState, useMemo, useCallback } from "react";

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState({
    temperature: "",
    description: "",
    humidity: "",
    windSpeed: "",
    main: "",
  });
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isWeatherDataVisible, setisWeatherDataVisible] = useState(false);

  const toggleDarkMode = useCallback(() => setDarkMode((prev) => !prev), []);
  
  const contextValue = useMemo(() => ({
    cityName, setCityName, weatherData, setWeatherData, loading, 
    setLoading, isWeatherDataVisible, setisWeatherDataVisible, darkMode, 
    toggleDarkMode
  }), [cityName, weatherData, loading, isWeatherDataVisible, darkMode]);

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
};
