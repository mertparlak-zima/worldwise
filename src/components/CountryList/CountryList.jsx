import { countryList } from "./CountryList.module.css";
import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";
import CountryItem from "../CountryItem/CountryItem";
import { useCities } from "../../contexts/CitiesContext";
export default function CountryList() {
  const { isLoading, cities } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      return arr;
    }
  }, []);

  return (
    <ul className={countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}
