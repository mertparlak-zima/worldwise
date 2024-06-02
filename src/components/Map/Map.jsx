import { useNavigate, useSearchParams } from "react-router-dom";
import { mapContainer } from "./Map.module.css";

export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div onClick={() => navigate("form")} className={mapContainer}>
      maps
    </div>
  );
}
