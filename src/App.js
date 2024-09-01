import "./App.css";
import React, { useState } from "react";
import WeatherData from "./components/WeatherData";
import Search from "./components/Search";
import Photo from "./components/Photo";
import Cities from "./utilities/Cities";
import DeveloperInfo from "./components/DeveloperInfo";

function App() {
  const apiKey = "bcab6e6950bd669881812038ba52d878&units";
  const apiKeyPhotos = "Yjwb6QtX8g8kasCa40i4cqGP5H0kVEkcRH-mDS7Irf4";
  let [getCityName, setCityName] = useState("");
  let [getWeatherData, setWeatherData] = useState({
    temperature: "",
    description: "",
    humidity: "",
    windSpeed: "",
    main: "",
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loader
  const [isWeatherActiveOnce,setWeatherActiveOnce] = useState(false);

  const getWeatherApi = (city) => {
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  };

  const getGeolocationApi = (lat, long) => {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;
  };

  const getCitiesApi = (query) => {
    return `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=10&appid=${apiKey}`;
  };

  const getCityPhotoLink = (city) => {
    return `https://api.unsplash.com/search/photos?query=${city}&client_id=${apiKeyPhotos}`;
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  function successCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getCurrentCity(latitude, longitude);
  }

  function errorCallback(error) {
    console.error("Error occurred while retrieving location:", error);
  }

  const getCurrentCity = (latitude, longitude) => {
    setIsLoading(true); // Show loader
    fetch(getGeolocationApi(latitude, longitude))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Geolocation API error: ${response.status}`);
        }
        return response.json();
      })
      .then((cityData) => {
        console.log(cityData.name);
        let city = cityData.name;
        setCityName(city);
        let weatherInCelsius = (cityData.main.temp - 273.15).toFixed(2);
        setWeatherData({
          temperature: weatherInCelsius,
          description: cityData.weather[0].description,
          humidity: cityData.main.humidity,
          windSpeed: cityData.wind.speed,
          main: cityData.weather[0].main,
        });
        if(isWeatherActiveOnce === false){
          setWeatherActiveOnce(true);
        }
      })
      .catch((error) => {
        console.error("Error in getCurrentCity:", error);
      })
      .finally(() => {
        setIsLoading(false); // Hide loader
      });
  };

  return (
    <div className={`app-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <DeveloperInfo setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
      <Search
        citiesApi={getCitiesApi}
        setCityName={setCityName}
        showWeather={getCurrentCity}
        getCurrentLocation={getCurrentLocation}
        setWeatherData ={setWeatherData}
      />
      {isLoading && <div className="loader">Loading...</div>} {/* Loader */}
      {isWeatherActiveOnce === true && (
        <>
          <WeatherData getCity={getCityName} getWeatherData={getWeatherData} />
          {/* <Photo cityPhoto={getCityPhotoLink} getCity={getCityName} /> */}
        </>
      )}
    </div>
  );
}

export default App;
