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
        className="rounded mx-auto d-block"
        alt={props.getCity ? props.getCity : "City"}
      />
    );
}

export default Photo;
