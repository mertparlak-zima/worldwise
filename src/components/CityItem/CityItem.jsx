import { Link } from "react-router-dom";
import {
  cityItem,
  emoji,
  name,
  date,
  deleteBtn,
  cityItemActive,
} from "./CityItem.module.css";
import { useCities } from "../../contexts/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
export default function CityItem({ city }) {
  const { cityName, emoji: cityEmoji, date: cityDate, position, id } = city;
  const { currentCity, deleteCity } = useCities();

  return (
    <li>
      <Link
        className={`${cityItem} ${currentCity.id === id ? cityItemActive : ""}`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={emoji}>{cityEmoji}</span>
        <h3 className={name}>{cityName}</h3>
        <time className={date}>({formatDate(cityDate)})</time>
        <button
          onClick={(event) => deleteCity(event, id)}
          className={deleteBtn}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}
