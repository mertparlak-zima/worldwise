// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import BackButton from "../Button/BackButton";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../../contexts/CitiesContext";

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
  const naviagate = useNavigate();

  const [isLoadingGeoLocation, setIsLoadingGeoLocation] = useState(false);

  const { createCity, isLoading } = useCities();

  useEffect(
    function () {
      if (!mapLat && !mapLng) return;
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

  if (!mapLat && !mapLng) {
    return <Message message="Please select a location on the map" />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(e);

    if (!cityName || !date) return;

    // this is a we have a real api to post to the server we would use this code
    // const newCity = {
    //   cityName,
    //   country,
    //   emoji,
    //   date,
    //   notes,
    //   position: { lat: mapLat, lng: mapLng },
    //   id: Date.now(),
    // };

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat: mapLat, lng: mapLng },
      id: Date.now(),
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
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
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
          id="date"
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
