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

  const getWeatherApi = (city) => {
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  };
  const getGeolocationApi = (lat, long) => {
    return `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=5&appid=${apiKey}`;
  };
  const getCityPhotoLink = (city) => {
    return `https://api.unsplash.com/search/photos?query=${city}&client_id=${apiKeyPhotos}`;
  };

  Cities.sort();

  const getWeather = (val) => {
    return fetch(getWeatherApi(val))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status}`);
        }
        return response.json();
      })
      .then((weather) => {
        let weatherInCelsius = (weather.main.temp - 273.15).toFixed(2);
        let allWeatherData = [
          weatherInCelsius,
          weather.weather[0].description,
          weather.main.humidity,
          weather.wind.speed,
          weather.weather[0].main,
        ];
        return allWeatherData;
      })
      .catch((error) => {
        console.error("Error in getWeather:", error);
        throw error;
      });
  };

  const showWeather = (cityName) => {
    getWeather(cityName)
      .then((weather) => {
        setWeatherData({
          temperature: weather[0],
          description: weather[1],
          humidity: weather[2],
          windSpeed: weather[3],
          main: weather[4],
        });
      })
      .catch((error) => {
        console.error("Error in showWeather:", error);
      });
  };

  const getCountryName = () => {
    if (getCityName) {
      return Cities.find((city) => {
        let cityInLoweCase = city.toLowerCase();
        let getSettedCity = getCityName.toLowerCase();
        return cityInLoweCase.includes(getSettedCity);
      });
    }
    return null;
  };
  const countryName = getCountryName();
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
    fetch(getGeolocationApi(latitude, longitude))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Geolocation API error: ${response.status}`);
        }
        return response.json();
      })
      .then((cityData) => {
        if (cityData.length > 0) {
          let city = cityData[0].name.split(" ")[0];
          setCityName(city);
          showWeather(city);
        } else {
          throw new Error("No city data found.");
        }
      })
      .catch((error) => {
        console.error("Error in getCurrentCity:", error);
      });
  };

  return (
    <div className={`app-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <DeveloperInfo setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
      <Search
        cities={Cities}
        setCityName={setCityName}
        showWeather={showWeather}
        getCurrentLocation={getCurrentLocation}
      />
      {getCityName !== "" && (
        <>
          <WeatherData
            getCity={countryName}
            getWeatherData={getWeatherData}
          />
          <Photo cityPhoto={getCityPhotoLink} getCity={getCityName} />
        </>
      )}
    </div>
  );
}

export default App;
