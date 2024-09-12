import React from "react";

const Item = ({ city, onClick, showWeather }) => {
  const handleClick = () => {
    onClick(city); // Handle city selection
    // Assuming showWeather is used to fetch weather data, 
    // you need to pass the coordinates or fetch them inside the function.
    showWeather();  
  };

  return (
    <li
      className="list-group-item d-flex align-items-center border-0 rounded mb-2"
      onClick={handleClick}
    >
      {city}
    </li>
  );
};

export default Item;
