function Item(props) {
  return (
    <li
      className="list-group-item d-flex align-items-center border-0 rounded mb-2"
      onClick={() => {
        props.citiesList([]);
        props.onClick(props.city);
        props.setCityName(props.city);
        props.showWeather(props.city);
      }}
      style={{
        color: "#0277bd", 
        borderRadius: "20px", 
        padding: "12px 20px", 
        cursor: "pointer", 
        transition: "color 0.3s ease", 
        fontSize: "1rem", 
        width: "100%", 
        boxSizing: "border-box", 
        border: "1px solid #b3e5fc", 
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#81d4fa")} 
      onMouseLeave={(e) => (e.currentTarget.style.color = "#0277bd")}
    >
      {props.city}
    </li>
  );
}

export default Item;
