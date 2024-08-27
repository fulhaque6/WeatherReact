import React, { useEffect } from "react";

function WeatherData(props) {
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
