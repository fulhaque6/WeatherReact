import React, { useState, useMemo, useEffect } from "react";
import debounce from "lodash.debounce";
import Item from "./Item";

function Search(props) {
  const [citiesList, setCitiesList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const apiKey = "bcab6e6950bd669881812038ba52d878&units";

  const getGeolocationApi = (lat, long) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;

  const getCitiesApi = (query) => `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=10&appid=${apiKey}`;

  const handleLocationClick = () => {
    setInputValue("");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const successCallback = (position) => {
    const { latitude, longitude } = position.coords;
    getCurrentCity(latitude, longitude);
  };

  const errorCallback = (error) => {
    console.error("Error retrieving location:", error);
  };

  const getCurrentCity = async (latitude, longitude) => {
    try {
      props.setIsLoading(true);
      const response = await fetch(getGeolocationApi(latitude, longitude));
      if (!response.ok) {
        throw new Error(`Geolocation API error: ${response.status}`);
      }
      const cityData = await response.json();
      props.setCityName(cityData.name);
      const weatherInCelsius = (cityData.main.temp - 273.15).toFixed(2);
      props.setWeatherData({
        temperature: weatherInCelsius,
        description: cityData.weather[0].description,
        humidity: cityData.main.humidity,
        windSpeed: cityData.wind.speed,
        main: cityData.weather[0].main,
      });
      if (!props.isWeatherActiveOnce) {
        props.setWeatherActiveOnce(true);
      }
    } catch (error) {
      console.error("Error fetching weather for location:", error);
    } finally {
      props.setIsLoading(false);
    }
  };

  const fetchCitiesBySearch = async (query) => {
    if (query && /^[a-zA-Z\s]+$/.test(query)) {
      try {
        const response = await fetch(getCitiesApi(query));
        const data = await response.json();
        const cities = data.map(({ name, lat, lon }) => ({ city: name, lat, lon }));
        setCitiesList(cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    } else {
      setCitiesList([]);
    }
  };

  const debouncedFetchCities = useMemo(() => debounce(fetchCitiesBySearch, 300), []);

  useEffect(() => {
    return () => {
      debouncedFetchCities.cancel();
    };
  }, [debouncedFetchCities]);

  const handleItemClick = (city) => {
    setInputValue(city);
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    props.setCityName("");
    props.setWeatherData({
      temperature: "",
      description: "",
      humidity: "",
      windSpeed: "",
      main: "",
    });
    setInputValue(value);
    debouncedFetchCities(value);
  };

  return (
    <div className="container" style={{ marginTop: "6rem" }}>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="bg-light rounded-pill shadow-sm" style={{ backgroundColor: "#e0f7fa" }}>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-0">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
              <input
                value={inputValue}
                onChange={handleInputChange}
                type="text"
                className="form-control border-0 rounded-pill custom-input"
                placeholder="Search for a city..."
                aria-label="Search"
              />
              <span className="input-group-text bg-transparent border-0">
                <i className="fa-solid fa-location-dot" onClick={handleLocationClick}></i>
              </span>
            </div>
          </div>
          <ul className="list-group mt-3 rounded shadow-sm">
            {citiesList.map((cityObj, i) => (
              <Item
                key={i}
                city={cityObj.city}
                onClick={() => handleItemClick(cityObj.city)}
                citiesList={setCitiesList}
                setCityName={props.setCityName}
                showWeather={() => getCurrentCity(cityObj.lat, cityObj.lon)}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Search;
