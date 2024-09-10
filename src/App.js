import "./App.css";
import WeatherData from "./components/WeatherData";
import Search from "./components/Search";
import DeveloperInfo from "./components/DeveloperInfo/DeveloperInfo";
import useWeatherData from "./hooks/useWeatherData";

function App() {
  const {
    cityName,
    setCityName,
    weatherData,
    setWeatherData,
    isLoading,
    setIsLoading,
    isWeatherActiveOnce,
    setWeatherActiveOnce,
    isDarkMode,
    setIsDarkMode,
  } = useWeatherData();

  return (
    <div className={`app-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <DeveloperInfo setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
      <Search
        setCityName={setCityName}
        setIsLoading={setIsLoading}
        setWeatherData={setWeatherData}
        setWeatherActiveOnce={setWeatherActiveOnce}
        isWeatherActiveOnce={isWeatherActiveOnce}
      />
      {isLoading && <div className="loader">Loading...</div>}
      {isWeatherActiveOnce && (
        <WeatherData getCity={cityName} getWeatherData={weatherData} />
      )}
    </div>
  );
}

export default App;
