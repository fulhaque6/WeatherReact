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
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [weatherActiveOnce, setWeatherActiveOnce] = useState(false);

  return {
    cityName,
    setCityName,
    weatherData,
    setWeatherData,
    loading,
    setLoading,
    weatherActiveOnce,
    setWeatherActiveOnce,
    darkMode,
    setDarkMode
  };
}

export default useWeatherData;
