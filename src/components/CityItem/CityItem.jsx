import { cityItem, emoji, name, date, deleteBtn } from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
export default function CityItem({ city }) {
  const { cityName, emoji: cityEmoji, date: cityDate } = city;
  return (
    <li className={cityItem}>
      <span className={emoji}>{cityEmoji}</span>
      <h3 className={name}>{cityName}</h3>
      <time className={date}>({formatDate(cityDate)})</time>
      <button className={deleteBtn}>&times;</button>
    </li>
  );
}
