import { useState, useEffect, useId } from 'react';
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


Chart.register(CategoryScale);

function App() {
  const [selectedCity, setSelectedCity] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [cityChoice, setCityChoice] = useState([]);
  const [initialCity, setInitialCity] = useState(true);
  const [chartData, setChartData] = useState(null);
  const [week4Price, setWeek4Price] = useState(0);
  const [week3Price, setWeek3Price] = useState(0);
  const [week2Price, setWeek2Price] = useState(0);
  const [week1Price, setWeek1Price] = useState(0);
  const [filterText, setFilterText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [currentCity, setCurrentCity] = useState('');
  const [showAlert, setShowAlert] = useState(false);


//Placeholder for FlightData
  const [cities, setCities] = useState([
    { 'name': 'Dallas', 'code': 'DFW', 'price': 250 },
    { 'name': 'Chicago', 'code': 'ORD', 'price': 150 },
    { 'name': 'Austin', 'code': 'AUS', 'price': 239 },
    { 'name': 'Denver', 'code': 'DEN', 'price': 109 },
    { 'name': 'Atlanta', 'code': 'ATL', 'price': 300 },
    { 'name': 'Seattle', 'code': 'SEA', 'price': 125 },
    { 'name': 'Orlando', 'code': 'MCO', 'price': 380 },
    { 'name': 'Miami', 'code': 'MIA', 'price': 390 },
    { 'name': 'Phoenix', 'code': 'PHX', 'price': 210 },
    { 'name': 'Houston', 'code': 'IAH', 'price': 340 },
    { 'name': 'Charlotte', 'code': 'CLT', 'price': 370 },
    { 'name': 'Newark', 'code': 'EWR', 'price': 380 },
    { 'name': 'Minneapolis', 'code': 'MSP', 'price': 310 },
    { 'name': 'Detroit', 'code': 'DTW', 'price': 330 },
    { 'name': 'Philadelphia', 'code': 'PHL', 'price': 370 },
    { 'name': 'Boston', 'code': 'BOS', 'price': 360 },
    { 'name': 'Salt Lake City', 'code': 'SLC', 'price': 190 },
    { 'name': 'Washington D.C.', 'code': 'DCA', 'price': 350 },
    { 'name': 'Baltimore', 'code': 'BWI', 'price': 340 },
    { 'name': 'Fort Lauderdale', 'code': 'FLL', 'price': 370 },
    { 'name': 'Tampa', 'code': 'TPA', 'price': 360 },
    { 'name': 'Portland', 'code': 'PDX', 'price': 250 },
    { 'name': 'San Antonio', 'code': 'SAT', 'price': 330 },
    { 'name': 'St. Louis', 'code': 'STL', 'price': 300 },
    { 'name': 'Cleveland', 'code': 'CLE', 'price': 310 },
    { 'name': 'Kansas City', 'code': 'MCI', 'price': 320 },
    { 'name': 'Indianapolis', 'code': 'IND', 'price': 310 }
  ])
  const cityId = useId();

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

  const priceTrend = (price1, price2) => {
    return price1 < price2 ? '▲': '▼';

  }

  useEffect(() => {
    //sets default city
    setInitialCity(true);
  }, []);

  useEffect(() => {
    //Randomizes the cities used for default city
    setCityChoice(
      cities[
        Math.floor(Math.random() * cities.length)
      ]
    );
    }, []);

  useEffect(() => {
    //Set a default city if no city is entered
    if (initialCity && cityChoice) {
      setSelectedCity(cityChoice.code);
      setInitialCity(false);
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

  const handleChange = (e) => {
    const value = e.target.value;
    setFilterText(value);
    const filteredAirports = filterAirports(value);
    setSuggestions(filteredAirports);
    console.log("initialCity", initialCity);
    console.log("selectedCity:", selectedCity);
    console.log(suggestions);
  };

  const handleSuggestionChange = (airport) => {
    setSelectedCity(airport.code);
    setFilterText(airport.code);
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectedCity(filterText);
    setCurrentCity(airportCodeLookup[filterText])
    setShowResult(!showResult);
    console.log("initialCity:", initialCity);
    setFilterText('')
  };

  const setPriceAltert = (city) => {
  }

  var fourWeeksOut = new Date();
  var threeWeeksOut = new Date();
  var twoWeeksOut = new Date();
  var oneWeekOut = new Date ();
  fourWeeksOut.setDate(fourWeeksOut.getDate() - 28);
  threeWeeksOut.setDate(threeWeeksOut.getDate() - 21);
  twoWeeksOut.setDate(twoWeeksOut.getDate() - 14);
  oneWeekOut.setDate(oneWeekOut.getDate() - 7);

  const options = { year: 'numeric', month: 'short', day: 'numeric'};


console.log(selectedCity)
console.log(airportCodeLookup );

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
                  airportCodeLookup={airportCodeLookup}/>
                <button id="search-button" type="submit">Go</button>
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
                <span><span className="currentCity">{currentCity}</span> <GoArrowRight className="x" /> San Francisco</span>
                  <button id="price-alert" onClick={()=> setShowAlert(true)}>Create Price Alert</button>
                  {showAlert && (
                    <div className="priceAlertContainer">
                    <PriceAlert
                      showAlert={showAlert}
                      setShowAlert={setShowAlert}
                      />
                      </div>
                  )}
            </div>
            {chartData && <LineChart
              width={1000}
              height={40}
              options={{ maintainAspectRatio: false }}
              chartData={chartData}/>
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



