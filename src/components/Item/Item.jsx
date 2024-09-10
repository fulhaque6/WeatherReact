function Item(props) {
  const handleClick = () => {
    props.citiesList([]); 
    props.onClick(props.city); 
    props.showWeather(props.city.lat, props.city.lon); 
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
