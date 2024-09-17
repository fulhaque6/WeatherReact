import { Suspense, lazy } from "react";

import { WeatherProvider, useWeather } from "./context/WeatherContext";

import DeveloperInfo from "./components/DeveloperInfo";

import './App.scss';

const WeatherData = lazy(() => import("./components/WeatherData"));

const Search = lazy(() => import("./components/Search"));

function AppContent() {
  const { isWeatherDataVisible, loading, cityName, weatherData, darkMode } = useWeather();

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <DeveloperInfo />
      <Suspense fallback={<div className="loader">Loading components...</div>}>
        <Search />
      </Suspense>
      {loading && <div className="loader">Loading...</div>}
      {isWeatherDataVisible && (
        <Suspense fallback={<div className="loader">Loading weather data...</div>}>
          <WeatherData cityName={cityName} weatherData={weatherData} />
        </Suspense>
      )}
    </div>
  );
}

function App() {
  return (
    <WeatherProvider>
      <AppContent />
    </WeatherProvider>
  );
}

export default App;
