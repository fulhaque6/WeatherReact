import "./App.css";
import React, { useState } from "react";
import WeatherData from "./components/WeatherData";
import Search from "./components/Search";
import Photo from "./components/Photo";

function App() {
  const apiKey = "bcab6e6950bd669881812038ba52d878&units";
  const apiKeyPhotos = "Yjwb6QtX8g8kasCa40i4cqGP5H0kVEkcRH-mDS7Irf4";
  let [getCityName, setCityName] = useState("");
  let [getWeatherData, setWeatherData] = useState({
    temperature: "",
    description: "",
    humidity: "",
    windSpeed: "",
  });

  const getWeatherApi = (city) => {
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  };
  const getGeolocationApi = (lat, long, key) => {
    return `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=5&appid=${apiKey}`;
  };
  const getCityPhotoLink = (city, key) => {
    return `https://api.unsplash.com/search/photos?query=${city}&client_id=${apiKeyPhotos}`;
  };

  const cities = [
    "Lahore,Pakistan",
    "Karachi,Pakistan",
    "Islamabad,Pakistan",
    "New York,United States",
    "Los Angeles,United States",
    "Chicago,United States",
    "Houston,United States",
    "Phoenix,United States",
    "Philadelphia,United States",
    "San Antonio,United States",
    "San Diego,United States",
    "Dallas,United States",
    "London,United Kingdom",
    "Manchester,United Kingdom",
    "Birmingham,United Kingdom",
    "Glasgow,United Kingdom",
    "Tokyo,Japan",
    "Osaka,Japan",
    "Kyoto,Japan",
    "Nagoya,Japan",
    "Paris,France",
    "Marseille,France",
    "Lyon,France",
    "Toulouse,France",
    "Nice,France",
    "Berlin,Germany",
    "Munich,Germany",
    "Frankfurt,Germany",
    "Hamburg,Germany",
    "Cologne,Germany",
    "Sydney,Australia",
    "Melbourne,Australia",
    "Brisbane,Australia",
    "Perth,Australia",
    "Toronto,Canada",
    "Vancouver,Canada",
    "Montreal,Canada",
    "Ottawa,Canada",
    "Calgary,Canada",
    "Beijing,China",
    "Shanghai,China",
    "Guangzhou,China",
    "Shenzhen,China",
    "Chengdu,China",
    "Moscow,Russia",
    "Saint Petersburg,Russia",
    "Novosibirsk,Russia",
    "Yekaterinburg,Russia",
    "Nizhny Novgorod,Russia",
    "Rio de Janeiro,Brazil",
    "São Paulo,Brazil",
    "Brasília,Brazil",
    "Salvador,Brazil",
    "Fortaleza,Brazil",
    "Mexico City,Mexico",
    "Guadalajara,Mexico",
    "Monterrey,Mexico",
    "Puebla,Mexico",
    "Tijuana,Mexico",
    "Cairo,Egypt",
    "Alexandria,Egypt",
    "Giza,Egypt",
    "Shubra El-Kheima,Egypt",
    "Port Said,Egypt",
    "Cape Town,South Africa",
    "Johannesburg,South Africa",
    "Durban,South Africa",
    "Pretoria,South Africa",
    "Port Elizabeth,South Africa",
    "Dubai,United Arab Emirates",
    "Abu Dhabi,United Arab Emirates",
    "Sharjah,United Arab Emirates",
    "Al Ain,United Arab Emirates",
    "Fujairah,United Arab Emirates",
    "Buenos Aires,Argentina",
    "Córdoba,Argentina",
    "Rosario,Argentina",
    "Mendoza,Argentina",
    "La Plata,Argentina",
    "Istanbul,Turkey",
    "Ankara,Turkey",
    "Izmir,Turkey",
    "Bursa,Turkey",
    "Adana,Turkey",
    "Seoul,South Korea",
    "Busan,South Korea",
    "Incheon,South Korea",
    "Daegu,South Korea",
    "Daejeon,South Korea",
    "Bangkok,Thailand",
    "Chiang Mai,Thailand",
    "Phuket,Thailand",
    "Pattaya,Thailand",
    "Udon Thani,Thailand",
    "Rome,Italy",
    "Milan,Italy",
    "Naples,Italy",
    "Turin,Italy",
    "Palermo,Italy",
  ];
  cities.sort();

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
        });
      })
      .catch((error) => {
        console.error("Error in showWeather:", error);
      });
  };

  const getCountryName = () => {
    if (getCityName) {
      return cities.find((city) => {
        let cityInLoweCase = city.toLowerCase();
        let getSettedCity = getCityName.toLowerCase();
        return cityInLoweCase.includes(getSettedCity);
      });
    }
    return null;
  };
  const countryName = getCountryName();

  return (
    <div className="app-container">
      <Search
        cities={cities}
        setCityName={setCityName}
        showWeather={showWeather}
      />
      <WeatherData
        getCity={countryName}
        setCityName={setCityName}
        showWeather={showWeather}
        geolocationApi={getGeolocationApi}
        getWeatherData={getWeatherData}
      />
      <Photo cityPhoto={getCityPhotoLink} getCity={getCityName} />
    </div>
  );
}

export default App;
