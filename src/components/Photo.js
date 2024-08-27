import React, { useState, useEffect } from "react";

function Photo(props) {
  const [photoUrl, setPhotoUrl] = useState("");
  const fetchPhoto = async () => {
    if (props.getCity) {
      const citylink = await fetch(props.cityPhoto(props.getCity));
      const cityPhoto = await citylink.json();
      const photoUrl = cityPhoto.results[0].urls.small;
      setPhotoUrl(photoUrl);
    }
  };
  useEffect(() => {
    fetchPhoto();
  }, [props.getCity]);

  return (
    <div className="d-flex justify-content-center mt-3">
    <div style={{
      border: '5px solid #ddd', // Border color and thickness
      borderRadius: '10px',    // Rounded corners
      padding: '5px',          // Space between the border and the image
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)', // Optional shadow for a more framed look
      display: 'inline-block'  // Ensures the border is only around the image
    }}>
      <img
        src={photoUrl}
        className="img-fluid"
        alt={props.getCity ? props.getCity : "City"}
        style={{ width: 'auto', height: 'auto', maxWidth: '100%' }}
      />
    </div>
  </div>
  );
}

export default Photo;
