import { MapPin } from "@phosphor-icons/react/dist/ssr";

interface ShowOnMapButtonProps {
  lat: number;
  lng: number;
  className?: string;
}

const ShowOnMapButton = ({ lat, lng, className }: ShowOnMapButtonProps) => {
  return (
    <button
      onClick={() =>
        window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank")
      }
      className={className}
    >
      <MapPin className="w-4 h-4" />
      <span>Haritada Göster</span>
    </button>
  );
};

export default ShowOnMapButton;
