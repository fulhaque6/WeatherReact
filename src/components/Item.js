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
        color: "#0277bd", // Darker sky-blue text color for contrast
        borderRadius: "20px", // Rounded corners
        padding: "12px 20px", // Padding for better spacing
        cursor: "pointer", // Pointer cursor on hover
        transition: "color 0.3s ease", // Smooth text color transition
        fontSize: "1rem", // Font size for better readability
        width: "100%", // Ensure it takes full width of its container
        boxSizing: "border-box", // Include padding and border in element's total width and height
        border: "1px solid #b3e5fc", // Light blue border for subtle distinction
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#81d4fa")} // Slightly lighter blue on hover
      onMouseLeave={(e) => (e.currentTarget.style.color = "#0277bd")} // Original color on leave
    >
      {props.city}
    </li>
  );
}

export default Item;
