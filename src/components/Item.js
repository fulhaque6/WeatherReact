function Item(props) {
  return (
    <li
      className="list-group-item"
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
