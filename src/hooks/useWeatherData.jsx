import { useState } from "react";

function useWeatherData() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState({
    temperature: "",
    description: "",
    humidity: "",
    windSpeed: "",
    main: "",
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isWeatherActiveOnce, setWeatherActiveOnce] = useState(false);

  return {
    cityName,
    setCityName,
    weatherData,
    setWeatherData,
    isLoading,
    setIsLoading,
    isWeatherActiveOnce,
    setWeatherActiveOnce,
    isDarkMode,
    setIsDarkMode
  };
}

export default useWeatherData;
