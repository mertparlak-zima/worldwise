import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";
import CityList from "./components/CityList/CityList";
import { useEffect, useState } from "react";

const FAKE_DATA = [
  {
    cityName: "Lisbon",
    country: "Portugal",
    emoji: "🇵🇹",
    date: "2027-10-31T15:59:59.138Z",
    notes: "My favorite city so far!",
    position: {
      lat: 38.727881642324164,
      lng: -9.140900099907554,
    },
    id: 73930385,
  },
  {
    cityName: "Madrid",
    country: "Spain",
    emoji: "🇪🇸",
    date: "2027-07-15T08:22:53.976Z",
    notes: "",
    position: {
      lat: 40.46635901755316,
      lng: -3.7133789062500004,
    },
    id: 17806751,
  },
  {
    cityName: "Berlin",
    country: "Germany",
    emoji: "🇩🇪",
    date: "2027-02-12T09:24:11.863Z",
    notes: "Amazing 😃",
    position: {
      lat: 52.53586782505711,
      lng: 13.376933665713324,
    },
    id: 98443197,
  },
];
const URL = "http://localhost:9000";
function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        // setIsLoading(true);
        // const response = await fetch(`${URL}/cities`);
        // const data = await response.json();
        // setCities(data);
        setCities(FAKE_DATA);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        console.log(cities);
      }
    }
    fetchCities();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route
              index
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            <Route
              path="cities"
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            <Route path="countries" element={<div>countries</div>} />
            <Route path="form" element={<div>form</div>} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
