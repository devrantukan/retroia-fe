import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

export default function PropertyMap({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey || "",
  });

  if (!apiKey) {
    console.error("Google Maps API key is not configured");
    return (
      <div className="w-full h-[400px] bg-slate-100 flex items-center justify-center mb-4">
        <p>Harita yüklenemedi: API anahtarı yapılandırılmamış</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-[400px] bg-slate-100 flex items-center justify-center mb-4">
        <p>Harita yükleniyor...</p>
      </div>
    );
  }

  const center = { lat, lng };

  return (
    <div className="mb-4">
      <GoogleMap
        zoom={15}
        center={center}
        mapContainerClassName="w-full h-[400px] "
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
}
