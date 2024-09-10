
function DeveloperInfo(props) {

  const toggleTheme = () => {
    props.setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      className={`developer-info-container`}
    >
      <div className="github-link-container">
        <a
          href="https://github.com/fulhaque6/WeatherReact"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          <i className="fa-brands fa-github"></i>
        </a>
      </div>
      <div className="theme-toggle-container">
        <label className="theme-toggle-switch">
          <input type="checkbox" checked={props.isDarkMode} onChange={toggleTheme} />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
}

export default DeveloperInfo;
