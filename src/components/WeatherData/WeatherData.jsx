import {
  FaCloud,
  FaCloudSun,
  FaCloudShowersHeavy,
  FaCloudSunRain,
  FaSnowflake,
  FaWind,
  FaBolt,
} from "react-icons/fa";

function WeatherData({ weatherData = {}, cityName }) {
  const { temperature, description, humidity, windSpeed, main } =
    weatherData;
  const city =
    cityName !== "" ? cityName : <span className="weather-loader"></span>;

  const getWeatherIcon = (main, description) => {
    if (!main) return;
    switch (main) {
      case "Clear":
        return <FaCloudSun className="weather-icon" />;
      case "Clouds":
        if (description.includes("rain"))
          return <FaCloudShowersHeavy className="weather-icon" />;
        if (description.includes("drizzle"))
          return <FaCloudShowersHeavy className="weather-icon" />;
        if (description.includes("snow"))
          return <FaCloudSunRain className="weather-icon" />;
        return <FaCloud className="weather-icon" />;
      case "Rain":
        return <FaCloudShowersHeavy className="weather-icon" />;
      case "Snow":
        return <FaSnowflake className="weather-icon" />;
      case "Thunderstorm":
        return <FaBolt className="weather-icon" />;
      case "Wind":
        return <FaWind className="weather-icon" />;
      default:
        return <FaCloud className="weather-icon" />;
    }
  };

  const weatherIcon = getWeatherIcon(main, description);

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card text-center shadow-lg rounded border-light">
            <div className="card-body p-4">
              <h2 id="cityName" className="card-title mb-4">
                {city}
              </h2>
              <div className="mb-3">{weatherIcon}</div>
              <p id="temperature" className="card-text display-4 mb-3">
                {temperature}°C
              </p>
              <p id="weatherDescription" className="card-text mb-3">
                {description}
              </p>
              <div className="d-flex justify-content-around">
                <p id="humidity" className="card-text">
                  <strong>Humidity:</strong> {humidity}%
                </p>
                <p id="windSpeed" className="card-text">
                  <FaWind className="me-2" />
                  <strong>Wind Speed:</strong> {windSpeed} km/h
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
