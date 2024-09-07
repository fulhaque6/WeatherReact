function Item(props) {
  const handleClick = () => {
    props.citiesList([]); // Clear the list of cities
    props.onClick(props.city); // Pass the clicked city name to the parent component
    props.showWeather(props.city.lat, props.city.lon); // Show the weather for the clicked city
  };

  return (
    <li
      className="list-group-item d-flex align-items-center border-0 rounded mb-2"
      onClick={handleClick}
    >
      {props.city}
    </li>
  );
}

export default Item;
