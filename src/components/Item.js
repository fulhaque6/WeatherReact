function Item(props) {
  return (
    <li
      className={`list-group-item d-flex align-items-center border-0 rounded mb-2`}
      onClick={() => {
        props.citiesList([]);
        props.onClick(props.city);
        props.setCityName(props.city);
        props.showWeather(props.city);
      }}
    >
      {props.city}
    </li>
  );
}

export default Item;
