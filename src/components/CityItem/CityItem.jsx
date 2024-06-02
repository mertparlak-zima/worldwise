import { Link } from "react-router-dom";
import { cityItem, emoji, name, date, deleteBtn } from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
export default function CityItem({ city }) {
  const { cityName, emoji: cityEmoji, date: cityDate, position, id } = city;

  return (
    <li>
      <Link
        className={cityItem}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={emoji}>{cityEmoji}</span>
        <h3 className={name}>{cityName}</h3>
        <time className={date}>({formatDate(cityDate)})</time>
        <button className={deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}
