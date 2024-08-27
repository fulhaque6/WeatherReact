import Item from "./Item";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    <div className="container d-flex justify-content-center">
      <div className="row w-100 mt-5">
        <div className="col-12 col-md-8 offset-md-2">
          <div
            className="bg-light rounded-pill shadow-sm"
            style={{ backgroundColor: "#e0f7fa" }} // Light sky-blue background
          >
            <div className="input-group">
              <span className="input-group-text bg-transparent border-0">
                <i className="bi bi-search" style={{ color: "#0288d1" }}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </i>
              </span>
              <input
                value={inputValue}
                onChange={(event) => {
                  getCitiesBySearch(event.target.value);
                }}
                type="text"
                className="form-control border-0 rounded-pill"
                placeholder="Search for a city..."
                aria-label="Search"
                style={{
                  borderTopLeftRadius: "50px",
                  borderBottomLeftRadius: "50px",
                  padding: "10px 20px",
                  backgroundColor: "#e0f7fa", // Sky-blue background
                  color: "#0288d1", // Sky-blue text color
                }}
              />
              <span className="input-group-text bg-transparent border-0">
                <i className="bi bi-geo-alt" style={{ color: "#0288d1" }}>
                  <i className="fa-solid fa-location-dot"
                  onClick={props.getCurrentLocation}
                  ></i>
                </i>
              </span>
            </div>
          </div>
          <ul className="list-group mt-3 rounded shadow-sm">
            {getCitiesList.map((name, i) => (
              <Item
                key={i}
                city={name}
                onClick={handleItemClick}
                citiesList={setCitiesList}
                setCityName={props.setCityName}
                showWeather={props.showWeather}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Search;
