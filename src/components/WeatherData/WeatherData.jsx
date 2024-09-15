import './WeatherData.scss';

function WeatherData({ weatherData = {}, cityName }) {
  const { temperature, description, humidity, windSpeed, main } = weatherData;
  const city =
    cityName !== "" ? cityName : <span className="weather-loader"></span>;

  const getWeatherIcon = (main, description) => {
    if (!main) return;
    switch (main) {
      case "Clear":
        return <i className="fa-solid fa-cloud-sun"></i>;
      case "Clouds":
        if (description.includes("rain"))
          return <i className="fa-solid fa-cloud-showers-heavy"></i>;
        if (description.includes("drizzle"))
          return <i className="fa-solid fa-cloud-showers-heavy"></i>;
        if (description.includes("snow"))
          return <i className="fa-solid fa-cloud-sun-rain"></i>;
        return <i className="fa-solid fa-cloud"></i>;
      case "Rain":
        return <i className="fa-solid fa-raindrops"></i>;
      case "Snow":
        return <i className="fa-solid fa-snowflake"></i>;
      case "Thunderstorm":
        return <i className="fa-solid fa-cloud-bolt"></i>;
      case "Wind":
        return <i className="fa-solid fa-wind"></i>;
      default:
        return <i className="fa-solid fa-cloud"></i>;
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
              <div className="mb-3 fs-1 weather-icon">{weatherIcon}</div>
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
                  <i className="fa-solid fa-wind"></i>
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
