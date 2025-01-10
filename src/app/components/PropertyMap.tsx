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
    <div className="w-full h-full min-h-[50vh] mb-4">
      <GoogleMap
        zoom={15}
        center={center}
        mapContainerStyle={{ width: "100%", height: "100%", minHeight: "50vh" }}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
}
