import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent: React.FC<{ text: string }> = ({ text }) => (
  <div>{text}</div>
);

import Image from "next/image";

const Marker: React.FC = () => {
  return (
    <Image
      className="flex justify-center items-center"
      src="/pin.svg"
      alt="Map marker"
      width={24}
      height={24}
    />
  );
};

export default function SimpleMap() {
  const defaultProps = {
    center: {
      lat: 37.7156643,
      lng: 27.2174949,
    },
    zoom: 16,
  };

  return (
    // Important! Always set the container height explicitly
    <div
      style={{ height: "100%", width: "100%" }}
      className="aspect-square w-full h-full"
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDMTvXdDIxkmlxtPmBRBEUvpwX1PtWQTr4" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
      >
        <Marker />
      </GoogleMapReact>
    </div>
  );
}
