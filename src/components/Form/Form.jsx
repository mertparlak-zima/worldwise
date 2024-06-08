// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import BackButton from "../Button/BackButton";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";

function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export const flagEmojiToPng = (flag) => {
  const countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");

  return <img src={`https://flagcdn.com/24x18/${countryCode}.png`}></img>;
};

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const navigate = useNavigate();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [mapLat, mapLng] = useUrlPosition();
  const [emoji, setEmoji] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");

  const [isLoadingGeoLocation, setIsLoadingGeoLocation] = useState(false);

  useEffect(
    function () {
      async function fetchCityData() {
        try {
          setIsLoadingGeoLocation(true);
          setGeoCodingError("");
          const response = await fetch(
            `${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`
          );
          const data = await response.json();

          console.log(data);

          if (!data.countryCode) {
            throw new Error(
              "Country code not found, please click on the map to select a another location."
            );
          }

          setCityName(data.city || data.locality || "Unknown");
          setCountry(data.countryName || "Unknown");
          setEmoji(convertToEmoji(data.countryCode));
        } catch (error) {
          console.error(error);
          setGeoCodingError(error.message);
        } finally {
          setIsLoadingGeoLocation(false);
        }
      }
      fetchCityData();
    },
    [mapLat, mapLng]
  );

  if (isLoadingGeoLocation) {
    return <Spinner />;
  }

  if (geoCodingError) {
    return <Message message={geoCodingError} />;
  }

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji && flagEmojiToPng(emoji)}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
