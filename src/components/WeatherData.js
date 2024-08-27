import React, { useEffect } from "react";

function WeatherData(props) {
  useEffect(() => {
    getCurrentLocation();
  }, []);

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
    fetch(props.geolocationApi(latitude, longitude))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Geolocation API error: ${response.status}`);
        }
        return response.json();
      })
      .then((cityData) => {
        if (cityData.length > 0) {
          let city = cityData[0].name.split(" ")[0];
          props.setCityName(city);
          props.showWeather(city);
        } else {
          throw new Error("No city data found.");
        }
      })
      .catch((error) => {
        console.error("Error in getCurrentCity:", error);
      });
  };
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card text-center shadow-lg rounded">
            <div className="card-body p-4">
              <h2 id="cityName" className="card-title mb-4 text-primary">
                {props.getCity ? (
                  <div>{props.getCity}</div>
                ) : (
                  <div>Loading...</div>
                )}
              </h2>
              <p
                id="temperature"
                className="card-text display-4 text-dark mb-3"
              >
                {props.getWeatherData.temperature}°C
              </p>
              <p id="weatherDescription" className="card-text text-muted mb-3">
                {props.getWeatherData.description}
              </p>
              <div className="d-flex justify-content-around">
                <p id="humidity" className="card-text">
                  <strong>Humidity:</strong> {props.getWeatherData.humidity}%
                </p>
                <p id="windSpeed" className="card-text">
                  <strong>Wind Speed:</strong> {props.getWeatherData.windSpeed}{" "}
                  km/h
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherData;
