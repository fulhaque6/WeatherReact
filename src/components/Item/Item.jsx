const Item = ({ city, onClick, showWeather }) => {
  const handleClick = () => {
    onClick(city);
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
