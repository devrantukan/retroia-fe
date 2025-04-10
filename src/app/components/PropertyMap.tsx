import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

export default function PropertyMap({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey || "",
  });

  if (!apiKey) {
    console.error("Google Maps API key is not configured");
    return (
      <div className="w-full h-full min-h-[50vh] mb-4 bg-slate-100 flex items-center justify-center">
        <p>Harita yüklenemedi: API anahtarı yapılandırılmamış</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full min-h-[50vh] mb-4 bg-slate-100 flex items-center justify-center">
        <p>Harita yükleniyor...</p>
      </div>
    );
  }

  const center = { lat, lng };

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
