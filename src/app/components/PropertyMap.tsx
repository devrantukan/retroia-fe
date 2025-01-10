import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

export default function PropertyMap({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ||
      "AIzaSyDMTvXdDIxkmlxtPmBRBEUvpwX1PtWQTr4",
  });

  const center = { lat, lng };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap zoom={15} center={center} mapContainerClassName="w-full h-full">
      <Marker position={center} />
    </GoogleMap>
  );
}
