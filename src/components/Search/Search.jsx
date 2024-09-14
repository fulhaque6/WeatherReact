import { useState, useEffect, useRef } from "react";
import SearchInput from "../SearchInput";
import CitiesList from "../CitiesList";
import useGeolocation from "../../hooks/useGeolocation";

function Search({ setLoading, setCityName, setWeatherData, weatherActiveOnce, setWeatherActiveOnce }) {
  const [citiesList, setCitiesList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const inputChangedByUser = useRef(true);
  const apiKey = "bcab6e6950bd669881812038ba52d878&units";

  const { handleLocationClick , getCurrentCity } = useGeolocation(setLoading, setCityName, setWeatherData, setWeatherActiveOnce, weatherActiveOnce);

  const getCitiesApi = (query) =>
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=10&appid=${apiKey}`;

  const fetchCitiesBySearch = async (query) => {
    if (query && /^[a-zA-Z\s]+$/.test(query)) {
      try {
        const response = await fetch(getCitiesApi(query));
        const data = await response.json();
        const cities = data.map(({ name, lat, lon }) => ({
          city: name,
          lat,
          lon,
        }));
        setCitiesList(cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    } else {
      setCitiesList([]);
    }
  };

  useEffect(() => {
    if (!inputChangedByUser.current) {
      inputChangedByUser.current = true;
      return;
    }

    if (inputValue.trim() === "") {
      setCitiesList([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      fetchCitiesBySearch(inputValue);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [inputValue]);


  const handleOnLocationClick = ()=>{
    setInputValue("");
    handleLocationClick();
  }

  const handleItemClick = (city) => {
    setCitiesList([]);
    inputChangedByUser.current = false;
    setInputValue(city);
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setCityName("");
    setWeatherData({
      temperature: "",
      description: "",
      humidity: "",
      windSpeed: "",
      main: "",
    });
    inputChangedByUser.current = true;
    setInputValue(value);
  };

  return (
    <div className="container" style={{ marginTop: "6rem" }}>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <SearchInput
            inputValue={inputValue}
            onChange={handleInputChange}
            onLocationClick={handleOnLocationClick}
          />
          <CitiesList
            citiesList={citiesList}
            onItemClick={handleItemClick}
            onWeatherShow={getCurrentCity}
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
