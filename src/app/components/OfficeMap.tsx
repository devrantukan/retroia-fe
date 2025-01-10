import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

interface OfficeMapProps {
  lat: number;
  lng: number;
}

export default function OfficeMap({ lat, lng }: OfficeMapProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ||
      "AIzaSyDMTvXdDIxkmlxtPmBRBEUvpwX1PtWQTr4",
  });

  const center = { lat, lng };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      zoom={15}
      center={center}
      mapContainerClassName="w-full aspect-square"
    >
      <Marker position={center} />
    </GoogleMap>
  );
}
