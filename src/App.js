import "./App.css";
import WeatherData from "./components/WeatherData";
import Search from "./components/Search";
import DeveloperInfo from "./components/DeveloperInfo";
import useWeatherData from "./hooks/useWeatherData";

function App() {
  const {
    cityName,
    setCityName,
    weatherData,
    setWeatherData,
    loading,
    setLoading,
    weatherActiveOnce,
    setWeatherActiveOnce,
    darkMode,
    setDarkMode,
  } = useWeatherData();

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <DeveloperInfo setIsDarkMode={setDarkMode} isDarkMode={darkMode} />
      <Search
        setCityName={setCityName}
        setIsLoading={setLoading}
        setWeatherData={setWeatherData}
        setWeatherActiveOnce={setWeatherActiveOnce}
        isWeatherActiveOnce={weatherActiveOnce}
      />
      {loading && <div className="loader">Loading...</div>}
      {weatherActiveOnce && (
        <WeatherData getCity={cityName} getWeatherData={weatherData} />
      )}
    </div>
  );
}

export default App;
