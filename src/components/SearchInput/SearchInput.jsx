import React from "react";
import { FaSearch, FaLocationArrow } from "react-icons/fa";

const SearchInput = ({ inputValue, onChange, onLocationClick }) => (
  <div
    className="bg-light rounded-pill shadow-sm"
    style={{ backgroundColor: "#e0f7fa" }}
  >
    <div className="input-group">
      <span className="input-group-text bg-transparent border-0">
        <FaSearch />
      </span>
      <input
        value={inputValue}
        onChange={onChange}
        type="text"
        className="form-control border-0 rounded-pill custom-input"
        placeholder="Search for a city..."
        aria-label="Search"
      />
      <span className="input-group-text bg-transparent border-0">
        <FaLocationArrow onClick={onLocationClick} />
      </span>
    </div>
  </div>
);

export default SearchInput;
