import { useNavigate, useSearchParams } from "react-router-dom";
import { mapContainer, map } from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useCities } from "../../contexts/CitiesContext";
import { useEffect, useState } from "react";
import { useGeolocation } from "../../hooks/Geolocation/useGeolocation";
import Button from "../Button/Button";
import { useUrlPosition } from "../../hooks/useUrlPosition";

export default function Map() {
  const { cities } = useCities();
  const [mapPosition, setmapPosition] = useState([38, 35]);

  const [mapLat, mapLng] = useUrlPosition();

  const {
    getPosition,
    isLoading: isLoadingPosition,
    position: geolocationPosition,
  } = useGeolocation();

  useEffect(() => {
    if (!mapLat && !mapLng) return;

    setmapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (!geolocationPosition) return;

    setmapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
    <div className={mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "Loading..." : "Current Position"}
      </Button>
      <MapContainer className={map} center={mapPosition} zoom={10}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          const { lat, lng } = city.position;
          const position = [lat, lng];
          return (
            <Marker position={position} key={city.id}>
              <Popup>
                <span>{city.emoji}</span> <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
