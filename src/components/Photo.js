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
      }
    useEffect(() => {
      fetchPhoto();
    }, [props.getCity]);
  
    return (
      <img
        src={photoUrl}
        className="img-fluid"
        alt={props.getCity ? props.getCity : "City"}
        style={{ marginLeft: "120px" }}
      />
    );
}

export default Photo;
