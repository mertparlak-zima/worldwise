import { createContext, useEffect, useContext, useReducer, act } from "react";

const CitiesContext = createContext();

function reducer(state, action) {
  try {
    switch (action.type) {
      case "loading":
        return { ...state, isLoading: true };

      case "cities/loaded":
        return { ...state, isLoading: false, cities: action.payload };

      case "city/created":
        return {
          ...state,
          isLoading: false,
          cities: [...state.cities, action.payload],
          currentCity: action.payload,
        };

      case "city/deleted":
        return {
          ...state,
          isLoading: false,
          cities: state.cities.filter((city) => city.id !== action.payload),
        };

      case "city/loaded":
        return { ...state, isLoading: false, currentCity: action.payload };

      case "rejected":
        return { ...state, isLoading: false, error: action.payload };

      default:
        throw new Error("Action type not found");
    }
  } catch (error) {
    console.error(error);
  }
}

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: null,
};

function CitiesProvider({ children }) {
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

  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      try {
        // setIsLoading(true);
        // const response = await fetch(`${URL}/cities`);
        // const data = await response.json();
        // setCities(data);
        dispatch({ type: "cities/loaded", payload: FAKE_DATA });
      } catch (error) {
        console.error(error);
        dispatch({ type: "rejected", payload: error });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    //  function fetchCities() {
    //   try {
    //     setIsLoading(true);
    //     const response = await fetch(`${URL}/${id}`);
    //     const data = await response.json();
    //     setCurrentCity(data);
    //   } catch (error) {
    //     console.error(error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
    // fetchCities();

    const x = cities.find((city) => {
      if (city.id === Number(id)) {
        if (!city) return;

        dispatch({ type: "city/loaded", payload: city });
      }
    });
  }

  async function createCity(newCity) {
    try {
      // const response = await fetch(`${URL}/cities`, {
      //   method: "POST",
      //   body: JSON.stringify(newCity),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      // setCities((cities) => [...cities, newCity]);
      dispatch({ type: "city/created", payload: newCity });

      console.log(cities);
    } catch (error) {
      console.error(error);
      dispatch({ type: "rejected", payload: error });
    }
  }

  async function deleteCity(event, id) {
    try {
      event.preventDefault();
      // await fetch(`${URL}/${id}`, {
      //   method: "DELETE",
      // });

      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      console.error(error);
      dispatch({ type: "rejected", payload: error });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}

export { CitiesProvider, useCities };
