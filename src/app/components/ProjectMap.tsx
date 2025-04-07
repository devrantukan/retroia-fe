"use client";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

interface ProjectMapProps {
  lat: number;
  lng: number;
}

export default function ProjectMap({ lat, lng }: ProjectMapProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "",
  });

  if (!isLoaded) {
    return (
      <div className="h-[400px] rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
        <p>Harita yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="h-[400px] rounded-lg overflow-hidden">
      <GoogleMap
        zoom={15}
        center={{ lat, lng }}
        mapContainerClassName="w-full h-full"
      >
        <Marker position={{ lat, lng }} />
      </GoogleMap>
    </div>
  );
}
