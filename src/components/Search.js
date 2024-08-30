import React, { useState } from "react";
import Item from "./Item";

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

  let handleLocationClick = async () => {
    setCitiesList([]);
    setInputValue("");
    await props.getCurrentLocation();
  };

  return (
    <div className={`container`} style={{ marginTop: "6rem" }}>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div
            className="bg-light rounded-pill shadow-sm"
            style={{ backgroundColor: "#e0f7fa" }}
          >
            <div className="input-group">
              <span className="input-group-text bg-transparent border-0">
                <i className="bi bi-search">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </i>
              </span>
              <input
                value={inputValue}
                onChange={(event) => {
                  getCitiesBySearch(event.target.value);
                }}
                type="text"
                className="form-control border-0 rounded-pill custom-input"
                placeholder="Search for a city..."
                aria-label="Search"
              />
              <span className="input-group-text bg-transparent border-0">
                <i className="bi bi-geo-alt">
                  <i
                    className="fa-solid fa-location-dot"
                    onClick={handleLocationClick}
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
