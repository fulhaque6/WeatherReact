function Item(props) {
  return (
    <li
      className={`list-group-item d-flex align-items-center border-0 rounded mb-2`}
      onClick={() => {
        props.citiesList([]);
        props.onClick(props.city.city);
        props.showWeather(props.city.lat,props.city.lon);
      }}
    >
      {props.city.city}
    </li>
  );
}

export default Item;
