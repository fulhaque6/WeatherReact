import Item from "./Item";
import React, { useState } from "react";

function Search(props) {
  let [getCitiesList, setCitiesList] = useState([]);
  let [inputValue, setInputValue] = useState("");

  let getCitiesBySearch = (val) => {
    let citiesList = [];
    let userValue = val.toLowerCase();
    userValue = userValue.trimStart();
    for (let index = 0; index < props.cities.length; index++) {
      let cityName = props.cities[index].toLowerCase();
      if (cityName.includes(userValue) && userValue !== "") {
        citiesList.push(props.cities[index]);
      }
    }
    setCitiesList(citiesList);
    setInputValue(val);
  };

  let handleItemClick = (city) => {
    setInputValue(city);
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <ul
        className="list-group"
        style={{
          width: "400px", 
          position: "fixed", 
          top: "150px", 
          left: "50%", 
          transform: "translateX(-50%)", 
        }}
      >
        <li className="list-group-item">
          <div className="input-group">
            <input
              value={inputValue}
              onChange={(event) => {
                getCitiesBySearch(event.target.value);
              }}
              type="text"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
            />
          </div>
        </li>
        {getCitiesList.map((name, i) => {
          return (
            <Item
              key={i}
              city={name}
              onClick={handleItemClick}
              citiesList={setCitiesList}
              setCityName={props.setCityName}
              showWeather={props.showWeather}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default Search;
