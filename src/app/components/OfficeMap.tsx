import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

interface OfficeMapProps {
  lat: number;
  lng: number;
}

export default function OfficeMap({ lat, lng }: OfficeMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey || "",
  });

  if (!apiKey) {
    console.error("Google Maps API key is not configured");
    return (
      <div className="w-full aspect-square bg-slate-100 flex items-center justify-center">
        <p>Harita yüklenemedi: API anahtarı yapılandırılmamış</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full aspect-square bg-slate-100 flex items-center justify-center">
        <p>Harita yükleniyor...</p>
      </div>
    );
  }

  const center = { lat, lng };

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
