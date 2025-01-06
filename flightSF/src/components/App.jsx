import { useState, useEffect, useCallback, useId } from 'react';
import frame from '/frame.svg';
import '../App.css';
import { GoArrowRight } from "react-icons/go";

import createPriceAlert from './PriceAlert';

// import { FlightData } from "../utils/FlightData";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { FlightGraph } from "../utils/FlightGraph";
import LineChart from "./LineChart.jsx";
import SearchBar from "./SearchBar.jsx";
import Suggested from "./Suggested.jsx";
import PriceAlert from "./PriceAlert.jsx";
import { createPortal } from 'react-dom';


Chart.register(CategoryScale);

function App() {
  const [selectedCity, setSelectedCity] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [cityChoice, setCityChoice] = useState([{ 'name': 'Dallas', 'code': 'DFW', 'price': 250 }]);
  const [initialCity, setInitialCity] = useState(true);
  const [chartData, setChartData] = useState(null);
  const [week4Price, setWeek4Price] = useState(0);
  const [week3Price, setWeek3Price] = useState(0);
  const [week2Price, setWeek2Price] = useState(0);
  const [week1Price, setWeek1Price] = useState(0);
  const [filterText, setFilterText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [currentCity, setCurrentCity] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [suggestionSelected, setSuggestionSelected ] = useState(false);


  //Placeholder for FlightData
  const [cities, setCities] = useState([
    { "name": "Atlanta", "code": "ATL", "price": 300 },
    { "name": "Austin", "code": "AUS", "price": 250 },
    { "name": "Baltimore", "code": "BWI", "price": 280 },
    { "name": "Boston", "code": "BOS", "price": 330 },
    { "name": "Charlotte", "code": "CLT", "price": 310 },
    { "name": "Chicago", "code": "ORD", "price": 320 },
    { "name": "Cincinnati", "code": "CVG", "price": 330 },
    { "name": "Cleveland", "code": "CLE", "price": 300 },
    { "name": "Columbus", "code": "CMH", "price": 310 },
    { "name": "Dallas", "code": "DFW", "price": 350 },
    { "name": "Denver", "code": "DEN", "price": 220 },
    { "name": "Detroit", "code": "DTW", "price": 310 },
    { "name": "Fort Lauderdale", "code": "FLL", "price": 320 },
    { "name": "Honolulu", "code": "HNL", "price": 450 },
    { "name": "Houston", "code": "IAH", "price": 330 },
    { "name": "Indianapolis", "code": "IND", "price": 300 },
    { "name": "Kansas City", "code": "MCI", "price": 290 },
    { "name": "Las Vegas", "code": "LAS", "price": 180 },
    { "name": "Los Angeles", "code": "LAX", "price": 150 },
    { "name": "Louisville", "code": "SDF", "price": 320 },
    { "name": "Miami", "code": "MIA", "price": 380 },
    { "name": "Milwaukee", "code": "MKE", "price": 320 },
    { "name": "Minneapolis", "code": "MSP", "price": 280 },
    { "name": "Nashville", "code": "BNA", "price": 320 },
    { "name": "New Orleans", "code": "MSY", "price": 340 },
    { "name": "New York City", "code": "JFK", "price": 390 },
    { "name": "Newark", "code": "EWR", "price": 380 },
    { "name": "Oklahoma City", "code": "OKC", "price": 310 },
    { "name": "Orlando", "code": "MCO", "price": 360 },
    { "name": "Philadelphia", "code": "PHL", "price": 350 },
    { "name": "Phoenix", "code": "PHX", "price": 200 },
    { "name": "Pittsburgh", "code": "PIT", "price": 340 },
    { "name": "Portland", "code": "PDX", "price": 200 },
    { "name": "Raleigh", "code": "RDU", "price": 300 },
    { "name": "Sacramento", "code": "SMF", "price": 130 },
    { "name": "Salt Lake City", "code": "SLC", "price": 220 },
    { "name": "San Antonio", "code": "SAT", "price": 330 },
    { "name": "San Diego", "code": "SAN", "price": 140 },
    { "name": "San Jose", "code": "SJC", "price": 110 },
    { "name": "Seattle", "code": "SEA", "price": 240 },
    { "name": "St. Louis", "code": "STL", "price": 290 },
    { "name": "Tampa", "code": "TPA", "price": 330 },
    { "name": "Washington D.C.", "code": "DCA", "price": 340 }
  ]);

  const cityId = useId();
  let cachedKey = null;
  let lastRetrieved = null;

  const getAuthKey = async(clientId, clientSecret) => {
    const url = 'https://test.api.amadeus.com/v1/security/oauth2/token';
    const headers = {
      'Authorization': `'Bearer ${process.env.ACCESS_TOKEN}'`,
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const body = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      clientSecret: clientSecret
    })
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body.toString(),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await repsonse.json();
      console.log("Auth token:", data.access_token);


      cachedKey = data.access_token;
      lastRetrieved = Date.now(); // Update timestamp
      return cachedKey;

    } catch (err) {
      console.error('Error:', err);
      return null;
    }
  }
  const getPrice = (selectedCity, week) => {
    const multiplier = {
      4: 1,
      3: 1.2,
      2: 1.5,
      1: 1.75
    }
    const priceMap = cities.reduce((acc, city) => {
      // {DFW: 250, ORD: 150, AUS: 239...}
      acc[city.code] = Math.trunc(Math.random() * ((city.price * multiplier[week]) - city.price) + city.price);
      return acc;
    }, {});
    return priceMap[selectedCity];
  }

  const airportCodeLookup = cities.reduce((acc, city) => {
    acc[city.code] = city.name;
    return acc;
  }, {});

  const city = airportCodeLookup[selectedCity];

  const priceTrend = (price1, price2) => {
    return price1 < price2 ? '▲' : '▼';

  }

  useEffect(() => {
    //sets default city
    setInitialCity(true);
  }, []);


  useEffect(() => {
    if (initialCity && cityChoice) {
      setSelectedCity(cityChoice.code);
    }
  }, [cityChoice, initialCity]);

  useEffect(() => {
    if (selectedCity) {
      setCurrentCity(airportCodeLookup[selectedCity]);
    }
  }, [airportCodeLookup, selectedCity])


  const updateChartData = (week4Price, week3Price, week2Price, week1Price) => {
    setChartData({
      labels: ['4 Weeks Ago', '3 Weeks Ago', '2 Weeks Ago', '1 Week Ago'],
      datasets: [
        {
          label: `${selectedCity} Flight Prices`,
          data: [week4Price, week3Price, week2Price, week1Price],
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 2
        }
      ]
    });
  };
  useEffect(() => {
    if (selectedCity) {
      setWeek4Price(getPrice(selectedCity, 4));
      setWeek3Price(getPrice(selectedCity, 3));
      setWeek2Price(getPrice(selectedCity, 2));
      setWeek1Price(getPrice(selectedCity, 1));
    }
  }, [selectedCity]);

  useEffect(() => {
    // Update chart data when weekly prices change
    if (week4Price && week3Price && week2Price && week1Price) {
      updateChartData(week4Price, week3Price, week2Price, week1Price);
    }
  }, [week4Price, week3Price, week2Price, week1Price]);

  const filterAirports = (search) => {
    if (!search) {
      return [];
    }
    const searchValue = cities.filter((airport) =>
      airport.name.toLowerCase().startsWith(search.toLowerCase()) ||
    airport.code.toLowerCase().startsWith(search.toLowerCase())
  );
  return searchValue;
};

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
  const handleChange = (e) => {
    const value = e.target.value;
    setFilterText(value);
    const filteredAirports = filterAirports(value);
    setSuggestions(filteredAirports);
    setSuggestionSelected(true);
  };
  const debouncedFilter = useCallback(
    debounce((value) => {
      const filteredAirports = filterAirports(value);
      setSuggestions(filteredAirports);
    }, 300),
    []
  );

  const handleSuggestionChange = (airport) => {
    setSelectedCity(airport.code);
    setFilterText(airport.code);
    setSuggestions([]);
    setSuggestionSelected(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (airportCodeLookup[filterText]) {
      setSelectedCity(filterText);
      setCurrentCity(airportCodeLookup[filterText])
    } else {
      console.error('Invalid city code or name entered')
    }
    setShowResult(!showResult);
    console.log("initialCity:", initialCity);
    setFilterText('');
    setSuggestionSelected(false);
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Enter') {
        if (suggestionSelected) {
          handleSubmit(e);
        }
      }
    }
    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown)
    }
  }, [suggestionSelected]);



  const setPriceAltert = (city) => {
  }

  var fourWeeksOut = new Date();
  var threeWeeksOut = new Date();
  var twoWeeksOut = new Date();
  var oneWeekOut = new Date();
  fourWeeksOut.setDate(fourWeeksOut.getDate() - 28);
  threeWeeksOut.setDate(threeWeeksOut.getDate() - 21);
  twoWeeksOut.setDate(twoWeeksOut.getDate() - 14);
  oneWeekOut.setDate(oneWeekOut.getDate() - 7);

  const options = { year: 'numeric', month: 'short', day: 'numeric' };

  const getCachedAuthKey = async () => {
    const thirtyMinutes = 30 * 60 * 1000;
    if (cachedKey && lastRetrieved && Date.now() - lastRetrieved < thirtyMinutes) {
      console.log("Using cached key.");
      return cachedKey;
    }

    console.log("Fetching new key.");
    return await getAuthKey();
  };

  // cache key implementation:
  (async () => {
    try {
      const apiKey = await getCachedAuthKey();
      console.log("API Key:", apiKey);
    } catch (error) {
      console.error("Error:", error.message);
    }
  })();

  return (
    <div id="content">
      <p id="firstLine">Flights to </p>
      <img id="sf" src={frame} className="icon" alt="'San Francisco' with golden-gate-bridge" />
      <a href="https://www.sftravel.com/" target="_blank"></a>
      <div className="main-page">
        {!showResult ? (
          <form onSubmit={handleSubmit}>
            <div className="suggestions">
              <span className="search"  >
                <label className="departingLabel" htmlFor={cityId}>Enter name or airport code of departing city:</label>
                <SearchBar
                  handleChange={handleChange}
                  initialCity={selectedCity}
                  filterText={filterText}
                  airportCodeLookup={airportCodeLookup} />
                <button
                  id="search-button"
                  type="submit"
                  disabled={!filterText.trim()}
                >
                  Go
                </button>
              </span>
              {suggestions.length > 0 && (
                <div className="suggestions-container">
                  {suggestions.map((airport, index) => {
                    const suggestionId = useId;
                    return (
                      <Suggested
                        handleSuggestionChange={handleSuggestionChange}
                        index={index}
                        airport={airport}
                        key={index}
                        id={suggestionId}
                      />
                    )
                  })}
                </div>
              )}
            </div>
          </form>
        ) : (
          <div className="w-full justify-between">
            <div id="timeContainer">
              {[
                { label: "4 Weeks Ago", date: fourWeeksOut, price: week4Price, prevPrice: null },
                { label: "3 Weeks Ago", date: threeWeeksOut, price: week3Price, prevPrice: week4Price },
                { label: "2 Weeks Ago", date: twoWeeksOut, price: week2Price, prevPrice: week3Price },
                { label: "1 Week Ago", date: oneWeekOut, price: week1Price, prevPrice: week2Price }
              ].map((weekData, index) => (
                <div key={index} className="timeCard w-1/4">
                  <h2>{weekData.label}</h2>
                  <h3>{weekData.date.toLocaleDateString('en-US', options)}</h3>
                  <p className={weekData.prevPrice !== null && weekData.price > weekData.prevPrice ? 'up' : 'down'}>
                    {weekData.prevPrice !== null && priceTrend(weekData.prevPrice, weekData.price)}
                    ${weekData.price}
                  </p>
                </div>
              ))}
            </div>
            <div className="App">
              <div className="priceTitle">
                <span>
                  <span className="selectedCity">{city}</span>
                  <GoArrowRight className="arrow" />
                  San Francisco
                </span>
                <button id="price-alert" onClick={() => setShowModal(true)}>Create Price Alert</button>
                {showModal && (
                  <div id="offset">
                    {createPortal(
                      <PriceAlert
                        showModal={showModal}
                        setShowModal={setShowModal}
                        selectedCity={selectedCity}
                        airportCodeLookup={airportCodeLookup}
                        closeModal={() => setShowModal(false)}
                      />,
                      document.body
                    )}
                  </div>
                )}
              </div>
              {chartData && <LineChart
                width={1000}
                height={40}
                options={{ maintainAspectRatio: false, maintainAspectRatio: true }}
                chartData={chartData}
                />
              }
            </div>
            <button onClick={() => {
              setSelectedCity('');
              setFilterText('');
              setSuggestions([]);
              setInitialCity(true);
              setShowResult(!showResult);
            }}>New Search</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App;



