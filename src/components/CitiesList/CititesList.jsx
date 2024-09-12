import React from "react";
import Item from "../Item";

const CitiesList = ({ citiesList, onItemClick, onWeatherShow }) => {
  return (
    <ul className="list-group mt-3 rounded shadow-sm">
      {citiesList.map((cityObj, i) => (
        <Item
          key={i}
          city={cityObj.city}
          onClick={() => onItemClick(cityObj.city)}
          showWeather={() => onWeatherShow(cityObj.lat, cityObj.lon)}
        />
      ))}
    </ul>
  );
};

export default CitiesList;
