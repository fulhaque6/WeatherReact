import axios from 'axios';

const useGeolocation = (
  setLoading,
  setCityName,
  setWeatherData,
  setWeatherActiveOnce,
  weatherActiveOnce
) => {
  const geolocationApi = (lat, long) =>
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=bcab6e6950bd669881812038ba52d878&units`;

  const getCurrentCity = async (latitude, longitude) => {
    try {
      setLoading(true);
      const response = await axios.get(geolocationApi(latitude, longitude));

      const cityData = response.data; 

      setCityName(cityData.name);

      const weatherInCelsius = (cityData.main.temp - 273.15).toFixed(2);
      setWeatherData({
        temperature: weatherInCelsius,
        description: cityData.weather[0].description,
        humidity: cityData.main.humidity,
        windSpeed: cityData.wind.speed,
        main: cityData.weather[0].main,
      });

      if (!weatherActiveOnce) {
        setWeatherActiveOnce(true);
      }
    } catch (error) {
      console.error("Error fetching weather for location:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getCurrentCity(latitude, longitude);
        },
        (error) => {
          console.error("Error retrieving location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  return { handleLocationClick, getCurrentCity };
};

export default useGeolocation;
