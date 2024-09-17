import Item from "../Item";
import './CitiesList.scss';

const CitiesList = ({ citiesList, onItemClick, onWeatherShow }) => {

  const fetchCityName = (cityData)=>{
    return cityData.city;
  }

  const fetchCityLat = (cityData)=>{
    return cityData.lat;
  }

  const fetchCityLon = (cityData)=>{
    return cityData.lon;
  }

  return (
    <ul className="list-group mt-3 rounded shadow-sm">
      {citiesList.map((cityObj, i) => (
        <Item
          key={i}
          city={fetchCityName(cityObj)}
          onClick={() => onItemClick(fetchCityName(cityObj))}
          showWeather={() => onWeatherShow(fetchCityLat(cityObj), fetchCityLon(cityObj))}
        />
      ))}
    </ul>
  );
};

export default CitiesList;
